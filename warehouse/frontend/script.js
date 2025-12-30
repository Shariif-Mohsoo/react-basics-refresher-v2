let categories = [];
let products = [];
let transactions = [];
let editingProductId = null;
let editingCategoryId = null;

// ---------------- Fetch from backend ----------------
async function fetchCategories() {
    const res = await fetch('http://localhost:3000/api/categories');
    categories = await res.json();
}

async function fetchProducts() {
    const res = await fetch('http://localhost:3000/api/products');
    products = await res.json();
}

async function fetchTransactions() {
    const res = await fetch('http://localhost:3000/api/transactions');
    transactions = await res.json();
}

// ---------------- Initialization ----------------
document.addEventListener('DOMContentLoaded', async () => {
    await fetchCategories();
    await fetchProducts();
    await fetchTransactions();

    loadCategoryDropdown();
    loadTransactionProductDropdown();
    displayCategories();
    displayProducts();
    displayTransactions();
    updateDashboard();

    document.getElementById('transactionDate').valueAsDate = new Date();

    // Apply role-based restrictions if user is already logged in
    const role = localStorage.getItem('role');
    if (role) {
        document.querySelector('.auth-container').style.display = 'none';
        document.getElementById('appContainer').style.display = 'block';
        if (role === 'staff') restrictStaffAccess();
    }
});

// ---------------- Navigation ----------------
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
}

// ---------------- Dashboard ----------------
function updateDashboard() {
    document.getElementById('totalProducts').textContent = products.length;

    const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
    document.getElementById('totalValue').textContent = '$' + totalValue.toFixed(2);

    const lowStockItems = products.filter(p => p.quantity < 10);
    document.getElementById('lowStock').textContent = lowStockItems.length;

    document.getElementById('totalCategories').textContent = categories.length;

    const alertBox = document.getElementById('lowStockAlert');
    const alertText = document.getElementById('lowStockCountText');
    if (alertBox && alertText) {
        if (lowStockItems.length > 0) {
            alertBox.style.display = 'block';
            alertText.textContent = lowStockItems.length;
        } else {
            alertBox.style.display = 'none';
        }
    }

    const recent = transactions.slice(-5).reverse();
    const html = recent.map(t => {
        const product = products.find(p => p.id === t.product_id);
        return `
            <tr>
                <td>${product ? product.product_name : 'Unknown'}</td>
                <td style="color:${t.transaction_type === 'IN' ? 'green' : 'red'}">
                    ${t.transaction_type}
                </td>
                <td>${t.quantity}</td>
                <td>${t.transaction_date}</td>
            </tr>`;
    }).join('');
    document.getElementById('recentTransactions').innerHTML = html;
}

// ---------------- Download CSV ----------------
function downloadLowStockCSV() {
    const lowStockItems = products.filter(p => p.quantity < 10);
    if (lowStockItems.length === 0) return alert('No low stock items available');

    const headers = ['ID', 'Product Name', 'SKU', 'Category', 'Quantity', 'Price'];
    const rows = lowStockItems.map(p => [p.id, `"${p.product_name}"`, p.sku, `"${p.category_name || ''}"`, p.quantity, p.price]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'low_stock_items.csv';
    a.click();
    URL.revokeObjectURL(url);
}

// ---------------- Categories ----------------
function displayCategories() {
    const html = categories.map(c => `
        <tr>
            <td>${c.id}</td>
            <td>${c.category_name}</td>
            <td>
                <button class="edit-btn" onclick="editCategory(${c.id})">Edit</button>
                <button class="delete-btn" onclick="deleteCategory(${c.id})">Delete</button>
            </td>
        </tr>`).join('');
    document.getElementById('categoriesTable').innerHTML = html;

    if (localStorage.getItem('role') === 'staff') {
        document.querySelectorAll('#categoriesTable .edit-btn, #categoriesTable .delete-btn')
            .forEach(btn => btn.style.display = 'none');
    }
}

function loadCategoryDropdown() {
    const dropdowns = [document.getElementById('productCategory')];
    dropdowns.forEach(drop => {
        drop.innerHTML = categories.map(c => `<option value="${c.id}">${c.category_name}</option>`).join('');
    });
}

document.getElementById('categoryForm').addEventListener('submit', async (e) => {
    if (localStorage.getItem('role') === 'staff') {
        e.preventDefault();
        return alert("You do not have permission to add/edit categories.");
    }
    e.preventDefault();
    const name = document.getElementById('categoryName').value.trim();
    if (!name) return alert('Category name required');

    if (editingCategoryId) {
        await fetch(`http://localhost:3000/api/categories/${editingCategoryId}`, { method: 'PUT', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ category_name: name }) });
        editingCategoryId = null;
    } else {
        await fetch('http://localhost:3000/api/categories', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ category_name: name }) });
    }
    document.getElementById('categoryName').value = '';
    await fetchCategories();
    displayCategories();
    loadCategoryDropdown();
    updateDashboard();
});

function editCategory(id) {
    const c = categories.find(c => c.id === id);
    if (!c) return;
    editingCategoryId = id;
    document.getElementById('categoryName').value = c.category_name;
}

async function deleteCategory(id) {
    if (!confirm('Delete category?')) return;
    await fetch(`http://localhost:3000/api/categories/${id}`, { method: 'DELETE' });
    await fetchCategories();
    displayCategories();
    loadCategoryDropdown();
    updateDashboard();
}

function clearCategoryForm() {
    editingCategoryId = null;
    document.getElementById('categoryName').value = '';
}

// ---------------- Products ----------------
function displayProducts() {
    const html = products.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.product_name}</td>
            <td>${p.sku}</td>
            <td>${p.category_name || ''}</td>
            <td>${p.quantity}</td>
            <td>${parseFloat(p.price).toFixed(2)}</td>
            <td>
                <button class="edit-btn" onclick="editProduct(${p.id})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
            </td>
        </tr>`).join('');
    document.getElementById('productsTable').innerHTML = html;

    if (localStorage.getItem('role') === 'staff') {
        document.querySelectorAll('#productsTable .edit-btn, #productsTable .delete-btn')
            .forEach(btn => btn.style.display = 'none');
    }
}

function loadTransactionProductDropdown() {
    const dropdown = document.getElementById('transactionProduct');
    dropdown.innerHTML = products.map(p => `<option value="${p.id}">${p.product_name}</option>`).join('');
}

document.getElementById('productForm').addEventListener('submit', async (e) => {
    if (localStorage.getItem('role') === 'staff') {
        e.preventDefault();
        return alert("You do not have permission to edit products.");
    }
    e.preventDefault();
    const product = {
        product_name: document.getElementById('productName').value.trim(),
        sku: document.getElementById('productSKU').value.trim(),
        category_id: parseInt(document.getElementById('productCategory').value),
        quantity: parseInt(document.getElementById('productQuantity').value),
        price: parseFloat(document.getElementById('productPrice').value)
    };
    if (!product.product_name || !product.sku || !product.category_id) return alert('All fields required');

    if (editingProductId) {
        await fetch(`http://localhost:3000/api/products/${editingProductId}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(product) });
        editingProductId = null;
    } else {
        await fetch('http://localhost:3000/api/products', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(product) });
    }
    clearProductForm();
    await fetchProducts();
    displayProducts();
    loadTransactionProductDropdown();
    updateDashboard();
});

function editProduct(id) {
    const p = products.find(p => p.id === id);
    if (!p) return;
    editingProductId = id;
    document.getElementById('productName').value = p.product_name;
    document.getElementById('productSKU').value = p.sku;
    document.getElementById('productCategory').value = p.category_id;
    document.getElementById('productQuantity').value = p.quantity;
    document.getElementById('productPrice').value = p.price;
}

async function deleteProduct(id) {
    if (!confirm('Delete product?')) return;
    await fetch(`http://localhost:3000/api/products/${id}`, { method: 'DELETE' });
    await fetchProducts();
    displayProducts();
    loadTransactionProductDropdown();
    updateDashboard();
}

function clearProductForm() {
    editingProductId = null;
    document.getElementById('productForm').reset();
}

// ---------------- Transactions ----------------
function displayTransactions() {
    const html = transactions.map(t => {
        const product = products.find(p => p.id === t.product_id);
        return `<tr>
            <td>${product ? product.product_name : 'Unknown'}</td>
            <td style="color:${t.transaction_type==='IN'?'green':'red'}">${t.transaction_type}</td>
            <td>${t.quantity}</td>
            <td>${t.transaction_date}</td>
        </tr>`;
    }).join('');
    document.getElementById('transactionsTable').innerHTML = html;
}

document.getElementById('transactionForm').addEventListener('submit', async (e) => {
    if (localStorage.getItem('role') === 'staff') {
        e.preventDefault();
        return alert("You do not have permission to add transactions.");
    }
    e.preventDefault();
    const transaction = {
        product_id: parseInt(document.getElementById('transactionProduct').value),
        transaction_type: document.getElementById('transactionType').value,
        quantity: parseInt(document.getElementById('transactionQuantity').value),
        transaction_date: document.getElementById('transactionDate').value
    };
    if (!transaction.product_id || !transaction.transaction_type || !transaction.quantity) return alert('All fields required');

    await fetch('http://localhost:3000/api/transactions', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(transaction) });
    await fetchProducts();
    await fetchTransactions();
    displayProducts();
    displayTransactions();
    updateDashboard();
});

function clearTransactionForm() {
    document.getElementById('transactionForm').reset();
}

function searchProducts() {
    const query = document.getElementById('searchProduct').value.toLowerCase();
    const filtered = products.filter(p =>
        p.product_name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query) ||
        (p.category_name && p.category_name.toLowerCase().includes(query))
    );

    const html = filtered.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.product_name}</td>
            <td>${p.sku}</td>
            <td>${p.category_name || ''}</td>
            <td>${p.quantity}</td>
            <td>${parseFloat(p.price).toFixed(2)}</td>
            <td>
                <button class="edit-btn" onclick="editProduct(${p.id})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
            </td>
        </tr>`).join('');

    document.getElementById('productsTable').innerHTML = html;

    if (localStorage.getItem('role') === 'staff') {
        document.querySelectorAll('#productsTable .edit-btn, #productsTable .delete-btn')
            .forEach(btn => btn.style.display = 'none');
    }
}

// ---------------- Role-based access ----------------
function restrictStaffAccess() {
    // Hide restricted nav buttons
    const categoriesBtn = document.querySelector('button[onclick="showSection(\'categories\')"]');
    const transactionsBtn = document.querySelector('button[onclick="showSection(\'transactions\')"]');
    if (categoriesBtn) categoriesBtn.style.display = 'none';
    if (transactionsBtn) transactionsBtn.style.display = 'none';

    // Hide low stock CSV download
    const downloadBtn = document.querySelector('#lowStockAlert .btn-secondary');
    if (downloadBtn) downloadBtn.style.display = 'none';
}

// ---------------- Login & Signup ----------------
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});

// loginForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const username = document.getElementById("loginEmail").value.trim(); 
//   const password = document.getElementById("loginPassword").value.trim();

//   try {
//     const res = await fetch("http://localhost:3000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error);

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("role", data.role);

//     alert(`${data.role.toUpperCase()} logged in successfully!`);
//     document.querySelector('.auth-container').style.display = 'none';
//     document.getElementById('appContainer').style.display = 'block';

//     if (data.role === 'staff') restrictStaffAccess();
//   } catch (err) {
//     alert(err.message);
//   }
// });


// Login Logic
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("loginEmail").value.trim(); 
  const password = document.getElementById("loginPassword").value.trim();

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    currentUserRole = data.role; // store role
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    alert(`${data.role.toUpperCase()} logged in successfully!`);

    // Show main app container
    document.getElementById('appContainer').style.display = 'block';
    document.querySelector('.auth-container').style.display = 'none';

    // Role-based section hiding
    if (currentUserRole === 'staff') {
        document.querySelector("button[onclick=\"showSection('categories')\"]").style.display = 'none';
        document.querySelector("button[onclick=\"showSection('transactions')\"]").style.display = 'none';
    }

    // Fetch and display data
    await fetchCategories();
    await fetchProducts();
    await fetchTransactions();
    loadCategoryDropdown();
    loadTransactionProductDropdown();
    displayCategories();
    displayProducts();
    displayTransactions();
    updateDashboard();

  } catch (err) {
    alert(err.message);
  }
});


signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  try {
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    alert("Staff registered successfully! Please login.");
    signupForm.reset();
    document.getElementById('loginTab').click();
  } catch (err) {
    alert(err.message);
  }
});


// ---------------- Logout ----------------
logoutBtn.addEventListener('click', () => {
    document.getElementById('appContainer').style.display = 'none';
  const authContainer = document.querySelector('.auth-container');
  authContainer.style.display = 'flex';  // reset flex
  authContainer.style.justifyContent = 'center';
  authContainer.style.alignItems = 'center';
  authContainer.style.height = '100vh';  // full screen vertical center

    loginForm.reset();
    signupForm.reset();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    currentUserRole = null;

    // Show all sections again
    document.querySelector("button[onclick=\"showSection('categories')\"]").style.display = 'inline-block';
    document.querySelector("button[onclick=\"showSection('transactions')\"]").style.display = 'inline-block';
});


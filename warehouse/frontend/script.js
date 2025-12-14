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
    const lowStock = products.filter(p => p.quantity < 10).length;
    document.getElementById('lowStock').textContent = lowStock;
    document.getElementById('totalCategories').textContent = categories.length;

    const recent = transactions.slice(-5).reverse();
    const html = recent.map(t => {
        const product = products.find(p => p.id === t.product_id);
        return `<tr>
            <td>${product ? product.product_name : 'Unknown'}</td>
            <td style="color:${t.transaction_type === 'IN' ? 'green':'red'}">${t.transaction_type}</td>
            <td>${t.quantity}</td>
            <td>${t.transaction_date}</td>
        </tr>`;
    }).join('');
    document.getElementById('recentTransactions').innerHTML = html;
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
}

function loadCategoryDropdown() {
    const dropdowns = [document.getElementById('productCategory')];
    dropdowns.forEach(drop => {
        drop.innerHTML = categories.map(c => `<option value="${c.id}">${c.category_name}</option>`).join('');
    });
}

// Add / Update Category
document.getElementById('categoryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('categoryName').value.trim();
    if (!name) return alert('Category name required');

    if (editingCategoryId) {
        await fetch(`http://localhost:3000/api/categories/${editingCategoryId}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ category_name: name })
        });
        editingCategoryId = null;
    } else {
        await fetch('http://localhost:3000/api/categories', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ category_name: name })
        });
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
}

function loadTransactionProductDropdown() {
    const dropdown = document.getElementById('transactionProduct');
    dropdown.innerHTML = products.map(p => `<option value="${p.id}">${p.product_name}</option>`).join('');
}

document.getElementById('productForm').addEventListener('submit', async (e) => {
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
        await fetch(`http://localhost:3000/api/products/${editingProductId}`, {
            method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(product)
        });
        editingProductId = null;
    } else {
        await fetch('http://localhost:3000/api/products', {
            method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(product)
        });
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
    e.preventDefault();
    const transaction = {
        product_id: parseInt(document.getElementById('transactionProduct').value),
        transaction_type: document.getElementById('transactionType').value,
        quantity: parseInt(document.getElementById('transactionQuantity').value),
        transaction_date: document.getElementById('transactionDate').value
    };
    if (!transaction.product_id || !transaction.transaction_type || !transaction.quantity) return alert('All fields required');

    await fetch('http://localhost:3000/api/transactions', {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(transaction)
    });
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
        </tr>
    `).join('');

    document.getElementById('productsTable').innerHTML = html;
}

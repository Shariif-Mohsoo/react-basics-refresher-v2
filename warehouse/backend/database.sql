-- -- Create database
-- CREATE DATABASE warehouse_db;
-- -- Connect to the database
-- \c warehouse_db;
-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);
-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    category_id INTEGER REFERENCES categories(id) ON DELETE
    SET NULL,
        quantity INTEGER NOT NULL DEFAULT 0,
        price DECIMAL(10, 2) NOT NULL
);
-- Create transactions table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('IN', 'OUT')),
    quantity INTEGER NOT NULL,
    transaction_date DATE NOT NULL
);
-- Sample categories
INSERT INTO categories (category_name)
VALUES ('Electronics'),
    ('Clothing'),
    ('Food'),
    ('Furniture');
-- Sample products
INSERT INTO products (product_name, sku, category_id, quantity, price)
VALUES ('Laptop', 'LAP001', 1, 15, 899.99),
    ('T-Shirt', 'TSH001', 2, 50, 19.99),
    ('Rice Bag', 'RICE001', 3, 8, 25.00),
    ('Office Chair', 'CHR001', 4, 12, 149.99),
    ('Smartphone', 'PHN001', 1, 25, 599.99);
-- Sample transactions
INSERT INTO transactions (
        product_id,
        transaction_type,
        quantity,
        transaction_date
    )
VALUES (1, 'IN', 10, '2024-11-10'),
    (2, 'OUT', 5, '2024-11-11'),
    (3, 'IN', 20, '2024-11-12'),
    (4, 'OUT', 3, '2024-11-12');
SELECT *
from categories;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'staff')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insert default admin
INSERT INTO users (username, password, role)
VALUES (
        'admin@warehouse.com',
        '$2b$10$C13fJnYbkk.S9QJPwlbZdepLu2cUbvgvRCdzbdoq5rUyENjMOB9se',
        'admin'
    );
SELECT *
FROM users;
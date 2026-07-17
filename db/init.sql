-- Create database if not exists
CREATE DATABASE IF NOT EXISTS expense_system_development CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE expense_system_development;
-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category_id INT NOT NULL,
  payer_name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
  INDEX idx_category_id (category_id),
  INDEX idx_created_at (created_at)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- Seed categories
INSERT INTO categories (name)
VALUES ('Food'),
  ('Transport'),
  ('Supplies'),
  ('Entertainment'),
  ('Utilities') ON DUPLICATE KEY
UPDATE name = name;
-- Seed expenses
INSERT INTO expenses (description, amount, category_id, payer_name)
VALUES (
    'Team Lunch at Italian Restaurant',
    1500.50,
    1,
    'John Doe',
    '2026-07-17'
  ),
  (
    'Grab to Client Meeting',
    350.00,
    2,
    'Jane Smith',
    '2026-07-17'
  ),
  (
    'Office Supplies - Pens and Paper',
    450.75,
    3,
    'Mike Johnson',
    '2026-07-17'
  ),
  ('Team Building Dinner', 2800.00, 1, 'Sarah Lee'),
  ('Taxi to Airport', 800.00, 2, 'John Doe'),
  (
    'Coffee and Snacks for Meeting',
    250.25,
    1,
    'Emily Chen',
    '2026-07-17'
  ),
  (
    'Printer Ink Cartridges',
    680.00,
    3,
    'Mike Johnson',
    '2026-07-17'
  ),
  (
    'Uber for Site Visit',
    420.50,
    2,
    'Jane Smith',
    '2026-07-17'
  ),
  (
    'Client Lunch Meeting',
    1850.00,
    1,
    'Sarah Lee',
    '2026-07-17'
  ),
  (
    'Office Cleaning Supplies',
    320.00,
    3,
    'Emily Chen',
    '2026-07-17'
  ),
  (
    'Team Movie Night',
    1200.00,
    4,
    'John Doe',
    '2026-07-17'
  ),
  (
    'Internet Bill',
    2500.00,
    5,
    'Mike Johnson',
    '2026-07-17'
  ),
  (
    'Breakfast Meeting with Client',
    580.00,
    1,
    'Jane Smith',
    '2026-07-17'
  ),
  (
    'Bus Tickets for Conference',
    150.00,
    2,
    'Sarah Lee',
    '2026-07-17'
  ),
  (
    'Electricity Bill',
    3200.00,
    5,
    'Emily Chen',
    '2026-07-17'
  );
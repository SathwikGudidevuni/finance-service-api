CREATE DATABASE IF NOT EXISTS finance_service_db;

USE finance_service_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role ENUM('viewer', 'analyst', 'admin') NOT NULL,
    status ENUM('active', 'inactive') NOT NULL
);

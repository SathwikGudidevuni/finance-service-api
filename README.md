# Finance Service API

A backend project built with Node.js, Express, and MySQL for managing users, financial records, and dashboard summaries.

## Overview

This project was developed as a backend assignment to demonstrate:

* Clean project structure
* REST API design
* MySQL integration
* Role-based access control
* Financial record management
* Dashboard summary APIs
* Backend enhancements

The application supports user management, financial tracking, filtering, pagination, and secure API handling.

## Features

### User Management

* Create user
* Get all users
* Get user by ID
* Update user
* Delete user

### Financial Records Management

* Create financial record
* Get all financial records
* Get financial record by ID
* Update financial record
* Soft delete financial record
* Filter records by type, category, and date
* Pagination support

### Dashboard Summary APIs

* Total income
* Total expenses
* Net balance
* Category-wise totals
* Recent activity
* Monthly trends

### Role-Based Access Control

* Viewer: Access dashboard only
* Analyst: View users and financial records
* Admin: Full access (create, update, delete)

## Tech Stack

* Node.js
* Express.js
* MySQL (Database)
* mysql2 (MySQL driver for Node.js)
* dotenv
* express-rate-limit

## Project Structure

```bash
finance-service-api/
│── config/
│   └── db.js
│── controllers/
│   ├── dashboardController.js
│   ├── recordController.js
│   └── userController.js
│── docs/
│   └── finance-service-api-postman-collection.json
│── middlewares/
│   └── roleMiddleware.js
│── routes/
│   ├── dashboardRoutes.js
│   ├── recordRoutes.js
│   └── userRoutes.js
│── app.js
│── package.json
│── schema.sql
│── README.md
```

## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/SathwikGudidevuni/finance-service-api.git
cd finance-service-api
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables
   Create a `.env` file in the root directory and add:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=finance_service_db
PORT=3000
```

4. Setup database
   Run the SQL schema:

```bash
mysql -u root -p < schema.sql
```

5. Start the server

```bash
npm start
# or
npm run dev
```

## Base URL

```
http://localhost:3000
```

## Authentication & Role-Based Access Control

This API uses role-based access control (RBAC) via HTTP headers. Include the `role` header in your requests:

```
role: admin     # Full access (create, update, delete)
role: analyst  # View users and financial records
role: viewer   # Access dashboard only
```

Example request with role header in Postman:
- **Method**: POST
- **URL**: `http://localhost:3000/users`
- **Headers**:
  - `Content-Type`: `application/json`
  - `role`: `admin`
- **Body** (raw JSON):
```json
{
  "name": "John",
  "role": "analyst",
  "status": "active"
}
```

## API Documentation

Postman collection is available in:

```
docs/finance-service-api-postman-collection.json
```

Import this file into Postman to test all endpoints.

## Sample API

### Create User

**POST /users**

Request:

```json
{
  "name": "Teja",
  "role": "viewer",
  "status": "active"
}
```

Response:

```json
{
    "message": "User created successfully",
    "user": {
        "id": 14,
        "name": "Teja",
        "role": "viewer",
        "status": "active"
    }
}
```

---

### Create Financial Record

**POST /records**

Request:

```json
{
    "amount": "600.00",
    "type": "expense",
    "category": "Food",
    "record_date": "2026-04-10",
    "notes": "Lunch"
}
```

Response:

```json
{
    "message": "Financial record created successfully",
    "record": {
        "id": 9,
        "amount": "600.00",
        "type": "expense",
        "category": "Food",
        "record_date": "2026-04-10",
        "notes": "Lunch"
    }
}
```

---

### Get Dashboard Summary

**GET /dashboard**

Request (with role header) in Postman:
- **Method**: GET
- **URL**: `http://localhost:3000/dashboard`
- **Headers**:
  - `role`: `viewer`

Response:
```json
{
    "totalIncome": 3000.00,
    "totalExpenses": 600.00,
    "netBalance": 2400.00,
    "categoryTotals": {
        "Food": 600.00,
        "Salary": 3000.00
    },
    "recentActivity": [
        {
            "id": 9,
            "amount": "600.00",
            "type": "expense",
            "category": "Food",
            "record_date": "2026-04-10",
            "notes": "Lunch"
        }
    ],
    "monthlyTrends": [
        {
            "month": "2026-04",
            "income": 3000.00,
            "expenses": 600.00
        }
    ]
}
```

---

### Get Filtered Financial Records

**GET /records**

Request with query parameters in Postman:
- **Method**: GET
- **URL**: `http://localhost:3000/records?type=expense&category=Food&page=1&limit=10`
- **Headers**:
  - `role`: `analyst`

Response:
```json
{
    "message": "Financial records fetched successfully",
    "page": 1,
    "limit": 10,
    "records": [
        {
            "id": 8,
            "amount": "600.00",
            "type": "expense",
            "category": "Food",
            "record_date": "2026-04-09T18:30:00.000Z",
            "notes": "Lunch"
        },
        {
            "id": 9,
            "amount": "600.00",
            "type": "expense",
            "category": "Food",
            "record_date": "2026-04-09T18:30:00.000Z",
            "notes": "Lunch"
        },
        {
            "id": 6,
            "amount": "1500.00",
            "type": "expense",
            "category": "Food",
            "record_date": "2026-04-04T18:30:00.000Z",
            "notes": "Lunch and groceries"
        }
    ]
}
```

**Query Parameters:**
- `type`: Filter by "income" or "expense"
- `category`: Filter by category (Food, Transport, Utilities, etc.)
- `record_date`: Filter records from this date (YYYY-MM-DD)
- `page`: Page number for pagination (default: 1)
- `limit`: Number of records per page (default: 10)

## Additional Enhancements Implemented

* Soft delete for financial records
* Pagination for record listing
* Rate limiting for API protection
* API documentation using Postman

## Author

Sathwik Krishna

## Notes

This project was created as part of a backend development assignment for internship evaluation.

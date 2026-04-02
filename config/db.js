const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_mysql_password",
  database: "finance_service_db"
});

db.connect((error) => {
  if (error) {
    console.log("Database connection failed:", error.message);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;

const db = require("../config/db");

const getDashboard = (req, res) => {
  const incomeQuery = "SELECT SUM(amount) AS totalIncome FROM financial_records WHERE type = 'income'";
  const expenseQuery = "SELECT SUM(amount) AS totalExpenses FROM financial_records WHERE type = 'expense'";
  const categoryQuery = "SELECT category, SUM(amount) AS totalAmount FROM financial_records GROUP BY category";

  db.execute(incomeQuery, (err, incomeResult) => {
    if (err) {
      return res.status(500).json({
        message: "Error Fetching income",
        error: err.message
      })
    }

    db.execute(expenseQuery, (err, expenseResult) => {
      if (err) {
        return res.status(500).json({
          message: "Error Fetching expenses",
          error: err.message
        })
      }

      db.execute(categoryQuery, (err, categoryResult) => {
        if (err) {
          return res.status(500).json({
            message: "Error Fetching category totals",
            error: err.message
          })
        }

        const totalIncome = Number(incomeResult[0].totalIncome) || 0;
        const totalExpenses = Number(expenseResult[0].totalExpenses) || 0;
        const netBalance = totalIncome - totalExpenses;

        const categoryTotals = categoryResult.map((item) => ({
          category: item.category,
          totalAmount: Number(item.totalAmount)
        }));

        res.status(200).json({
          message: "Dashboard data fetched successfully",
          data: {
            totalIncome,
            totalExpenses,
            netBalance,
            categoryTotals
          }
        });
      });
    });
  });
};

module.exports = { getDashboard };

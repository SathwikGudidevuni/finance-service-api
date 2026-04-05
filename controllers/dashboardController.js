const db = require("../config/db");

const getDashboard = (req, res) => {
  const incomeQuery = "SELECT SUM(amount) AS totalIncome FROM financial_records WHERE type = 'income' AND is_deleted = FALSE";
  const expenseQuery = "SELECT SUM(amount) AS totalExpenses FROM financial_records WHERE type = 'expense' AND is_deleted = FALSE";
  const categoryQuery = "SELECT category, SUM(amount) AS totalAmount FROM financial_records WHERE is_deleted = FALSE GROUP BY category";
  const recentActivityQuery = "SELECT id, amount, type, category, record_date, notes FROM financial_records WHERE is_deleted = FALSE ORDER BY record_date DESC, id DESC LIMIT 5";
  const monthlyTrendsQuery = `
    SELECT DATE_FORMAT(record_date, '%Y-%m') AS month, type, SUM(amount) AS totalAmount
    FROM financial_records
    WHERE is_deleted = FALSE
    GROUP BY DATE_FORMAT(record_date, '%Y-%m'), type
    ORDER BY month DESC
  `;

  db.execute(incomeQuery, (err, incomeResult) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching income",
        error: err.message
      })
    }

    db.execute(expenseQuery, (err, expenseResult) => {
      if (err) {
        return res.status(500).json({
          message: "Error fetching expenses",
          error: err.message
        })
      }

      db.execute(categoryQuery, (err, categoryResult) => {
        if (err) {
          return res.status(500).json({
            message: "Error fetching category totals",
            error: err.message
          })
        }

        db.execute(recentActivityQuery, (err, recentActivityResult) => {
          if (err) {
            return res.status(500).json({
              message: "Error fetching recent activity",
              error: err.message
            })
          }

          db.execute(monthlyTrendsQuery, (err, monthlyTrendsResult) => {
            if (err) {
              return res.status(500).json({
                message: "Error fetching monthly trends",
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

            const recentActivity = recentActivityResult.map((item) => ({
              id: item.id,
              amount: Number(item.amount),
              type: item.type,
              category: item.category,
              record_date: item.record_date,
              notes: item.notes
            }));

            const monthlyTrends = monthlyTrendsResult.map((item) => ({
              month: item.month,
              type: item.type,
              totalAmount: Number(item.totalAmount)
            }));

            res.status(200).json({
              message: "Dashboard data fetched successfully",
              data: {
                totalIncome,
                totalExpenses,
                netBalance,
                categoryTotals,
                recentActivity,
                monthlyTrends
              }
            });
          });
        });
      });
    });
  });
};

module.exports = { getDashboard };

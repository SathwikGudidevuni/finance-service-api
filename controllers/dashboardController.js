const getDashboard = (req, res) => {
  res.status(200).json({
    message: "Dashboard data fetched successfully",
    data: {
      totalUsers: 100,
      activeUsers: 80,
      inactiveUsers: 20
    }
  });
};

module.exports = { getDashboard };

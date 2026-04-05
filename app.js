const express = require("express")
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const usersRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const recordRoutes = require("./routes/recordRoutes");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests, please try again later"
  }
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

app.use("/", limiter, dashboardRoutes);
app.use("/", limiter, usersRoutes);
app.use("/", limiter, recordRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

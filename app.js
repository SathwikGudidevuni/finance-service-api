const express = require("express")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const usersRoutes = require("./routes/userRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

app.use("/", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

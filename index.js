const Dotenv = require("dotenv");
Dotenv.config();

const express = require("express");
const connectDB = require("./database/db");

const userRoutes = require("./router/user.routes");
const newsRoutes = require("./router/news.routes");

const app = express();
app.use(express.json());

connectDB();
const port = process.env.PORT || 2800;

if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

app.get("/", (req, res) => {
  return res.status(200).json({ message: "home page 😊😊😊😊😊" });
});

app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "😒😒😒 oops page not found" });
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
  console.log(process.env.NODE_ENV);
});

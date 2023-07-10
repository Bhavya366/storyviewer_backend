const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// const storyRouter = require("./routes/storyRoute");
// const commentRouter = require("./routes/commentsRoute");
const authRouter = require("./routes/authRoute");
const storyRouter = require("./routes/storyRoute");
const slideRouter = require("./routes/slideRoute");

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Health check endpoint
app.get("/health", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

  res.status(200).json({
    server: "Running",
    database: dbStatus,
  });
});

app.use("/", authRouter);
app.use("/story", storyRouter);
app.use("/slide",slideRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Error handler middleware
app.use((err, req, res, next) => {
  res
    .status(500)
    .json({ error:err});
});

module.exports = app;
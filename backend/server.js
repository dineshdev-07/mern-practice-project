const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/goalmiddleware");
const colors = require("colors");
const mongoDB = require("./config/db");
mongoDB();

const port = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalroutes"));
app.use("/api/user", require("./routes/userRoutes.js"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});

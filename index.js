const express = require("express");
const cors = require("cors");
const URL = require("./models/userModel");
const routes = require("./router/urlroute.js");
const { connectToDB } = require("./mongodb.js");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/url", routes);

// Connect to MongoDB database
connectToDB();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

"use strict";
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

// Creates express app
const app = express();

// Serving static react files
app.use(express.static(path.join(__dirname, "/frontend/build")));

// Enabling CORS middleware
app.use(cors());

// Pull in routes file.
app.use("/api/", require("./routes/api/userCalls"));

// Uses port from environment or 5000 if none.
const PORT = process.env.PORT || 5000;

// Starts server
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

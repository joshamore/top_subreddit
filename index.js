"use strict";
const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

// Creates express app
const app = express();

// Enabling CORS middleware
app.use(cors());

// Pull in routes file.
app.use("/api/", require("./routes/api/userCalls"));

// Serves static files
app.use(express.static("public"));

// Uses port from environment or 5000 if none.
const PORT = process.env.PORT || 5000;

// Starts server
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

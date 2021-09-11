require('dotenv');
const express = require('express');
const { join } = require("path");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(join(__dirname, "public")));

app.use("/auth", require("./routes/auth"));

module.exports = app
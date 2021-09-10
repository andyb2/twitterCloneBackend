require('dotenv');
const express = require('express');
const session = require("express-session");
const PORT = process.env.PORT || 8080
const { join } = require("path");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(join(__dirname, "public")));

app.use("/auth", require("./routes/auth"));

app.listen(PORT, function () {
    console.log(`Server running on port: ${PORT}`)
})
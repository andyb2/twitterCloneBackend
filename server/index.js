require('dotenv');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/api"));

app.listen(PORT, function () {
    console.log(`Server running on port: ${PORT})`)
})
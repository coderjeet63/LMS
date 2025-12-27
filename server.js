// server.js
const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        message: "Namaste Senior Developer! Docker wala code chal gaya! 🐳",
        status: "Success"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
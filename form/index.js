const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit", (req, res) => {
    const incomingData = req.body.userInput;

    console.log(`Received input from user: ${incomingData}`);

    res.send(`<h1>Your Server Output</h1><p>You typed: ${incomingData}</p>`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to Student API");
});


app.post('/student', (req, res) => {
    const { name, age, course } = req.body;

    console.log(`Student Name : ${name} Age : ${age} Course : ${course}`);

    res.json({ message: "Student Registered Successfully" });
});

app.post('/teacher', (req, res) => {
    const { name, subject, experience } = req.body;

    console.log(`Teacher Name : ${name} Subject : ${subject} Experience : ${experience} Years`);

    res.json({ message: "Teacher Added Successfully" });
});


app.post('/product', (req, res) => {
    const { name, price, brand } = req.body;

    console.log(`Product : ${name} Price : ${price} Brand : ${brand}`);

    res.json({ message: "Product Added Successfully" });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
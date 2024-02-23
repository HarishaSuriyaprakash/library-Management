const express = require('express');
const mysql = require("mysql2");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const hbs = require("hbs");

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'abc', 
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('success');
    }
});

const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");
app.get("/", (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const { email, pwd } = req.body;

    console.log("Submitted data:", { email, pwd });

    const sql = "INSERT INTO logdet (email, pwd ) VALUES (?, ?)";
    const values = [email, pwd];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error storing form data in the database:", err);
            res.status(500).send("Error storing form data in the database");
        } else {
            res.render('home');
        }
    });
});

app.listen(5000, () => {
    console.log("server started @ port 5000");
});

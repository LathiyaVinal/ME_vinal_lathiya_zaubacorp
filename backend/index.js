const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/data", async (req, res) => {
    try {
        const { name,cin } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO companies (name, cin) VALUES($1, $2)",
            [name,cin]
            );
        res.json(newTodo);
    } catch (err) {
        console.log(err);
        res.json("Found duplicate keys");
    }
});

app.get("/data", async (req, res) => {
    try {
        const newTodo = await pool.query(
            "SELECT * FROM companies");
        res.json(newTodo.rows);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

app.listen(5000, () => {
    console.log("Server connected at post 5000");
})
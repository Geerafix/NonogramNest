import pg from 'pg';
import express from 'express';

const { Client } = pg;
const server = express();
const port = 3000;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 4001,
    password: "admin",
    database: "nonogram-database"
});

client.connect();

server.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        if (!err) {
            res.json(result.rows);
        }
    });
});

server.listen(port, () => {
    console.log(`Serwer uruchomiony\nPort: ${port}`);
});
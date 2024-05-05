import pg from 'pg';
import express from 'express';
import cors from 'cors';

const { Client } = pg;
const server = express();
const port = 3000;

server.use(express.json());
server.use(cors());

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

server.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    client.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
        if (!err) {
            res.json(result.rows);
        }
    });
});

server.get('/nonograms', (req, res) => {
    client.query('SELECT * FROM nonograms', (err, result) => {
        if (!err) {
            res.json(result.rows);
        }
    });
});

server.post('/nonograms', (req, res) => {
    client.query('INSERT INTO nonograms (cluesx, cluesy) VALUES ($1, $2)', [req.body.cluesX, req.body.cluesY]);
    res.json(req.body);
});

server.listen(port, () => {
    console.log(`Serwer uruchomiony\nPort: ${port}`);
});
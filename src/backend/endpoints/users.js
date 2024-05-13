import { server, client } from '../server.js';
import * as pkg from 'argon2';
const argon2 = pkg;

server.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        if (!err) {
            res.json(result.rows);
        }
    });
});

server.post('/users', async (req, res) => {
    const email = await req.body.email;
    const username = await req.body.username;
    
    try {
        const hash = await argon2.hash(await req.body.password);
        client.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, hash]);
    } catch (err) {
        console.log(err);
    }

    res.json();
});

server.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    client.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
        if (!err) {
            res.json(result.rows);
        }
    });
});
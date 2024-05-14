import { server, client } from '../server.js';
import * as pkg from 'argon2';
const argon2 = pkg;

// logowanie
server.post('/signin', async (req, res) => {
    client.query('SELECT * FROM users WHERE email = $1 OR username = $1', [await req.body.username], async (err, result) => {
        if (result.rows[0] && await argon2.verify(result.rows[0].password, await req.body.password)) {
            res.status(200).send({ msg: 'Zalogowano' });
        } else {
            res.status(404).send({ msg: 'Nieprawidłowa nazwa użytkownika lub hasło' });
        }
    });
});

// rejestracja
server.post('/signup', async (req, res) => {
    const email = await req.body.email;
    const username = await req.body.username;
    client.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username], async (err, result) => {
        if (!result.rows[0]) {
            const hash = await argon2.hash(await req.body.password);
            client.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, hash]);
            res.status(200).send({ msg: 'Zarejestrowano' });
        } else {
            res.status(400).send({ msg: `Użytkownik o podanym email'u lub nazwie już istnieje` });
        }
    });
});

// server.get('/users', (req, res) => {
//     client.query('SELECT * FROM users', (err, result) => {
//         if (!err) {
//             res.json(result.rows);
//         }
//     });
// });

// server.get('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     client.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
//         if (!err) {
//             res.json(result.rows);
//         }
//     });
// });
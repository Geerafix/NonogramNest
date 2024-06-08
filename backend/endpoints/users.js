import { server, client } from '../server.js';
import * as pkg from 'argon2';
const argon2 = pkg;

// logowanie
server.post('/signin', async (req, res) => {
    client.query('SELECT * FROM users WHERE email = LOWER($1) OR username = LOWER($1)', [await req.body.username], async (err, result) => {
        if (result.rows[0] && await argon2.verify(result.rows[0].password, await req.body.password)) {
            req.session.user = result.rows[0];
            res.status(200).send(req.session.user.role);
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

// zwraca użytkowników
server.post('/users', async (req, res) => {
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 4;
    const offset = (page - 1) * limit;
    
    client.query('SELECT user_id, email, username, role FROM users ORDER BY user_id ASC LIMIT ($1) OFFSET ($2)', [limit, offset], async (err, result) => {
        res.json(result.rows);
    });
});

// wylogowanie
server.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send({ msg: 'Sesja zniszczona' })
});

// sprawdzanie roli
server.post('/role', (req, res) => {
    req.session.user ? res.json({ role: req.session.user.role }) : res.json();
});

server.get('/session', (req, res) => {
    res.json(req.session);
});
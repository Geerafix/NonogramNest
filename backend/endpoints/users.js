import { server, client } from '../server.js';
import * as pkg from 'argon2';
const argon2 = pkg;

// logowanie
server.post('/signin', async (req, res) => {
    client.query('SELECT * FROM users WHERE email = $1 OR username = $1', [await req.body.username], async (err, result) => {
        if (result.rows[0] && await argon2.verify(result.rows[0].password, await req.body.password)) {
            req.session.user = result.rows[0];
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

// wylogowanie
server.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send({ msg: 'Sesja zniszczona' })
});

// sprawdzanie roli
server.post('/role', async (req, res) => {
    if (await req.session.user) {
        res.json({ role: await req.session.user.role });
    } else {
        res.json({ role: 'none' });
    }
});

server.get('/session', (req, res) => {
    res.json(req.session);
});
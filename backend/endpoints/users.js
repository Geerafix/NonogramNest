import { server } from '../server.js';
import { User, UserProfile } from '../models/models.js';
import { Op } from 'sequelize';
import * as pkg from 'argon2';
const argon2 = pkg;

server.post('/signin', async (req, res) => {
    const user = await User.findOne({ 
        where: { [Op.or]: [{ username: await req.body.username }, { email: await req.body.username }]}
    });

    if(user && await argon2.verify(user.password, await req.body.password)) {
        req.session.user = user;
        res.status(200).send(req.session.user.role);
    } else {
        res.status(404).send({ msg: 'Nieprawidłowa nazwa użytkownika lub hasło' });
    }
});

server.post('/signup', async (req, res) => {
    const email = await req.body.email;
    const username = await req.body.username;
    const password = await req.body.password;
    
    const user = await User.findOne({ 
        where: { [Op.or]: [{ username: await req.body.username }, { email: await req.body.email }]}
    });

    if (!user) {
        const hash = await argon2.hash(password);
        const user = await User.create({ email: email, username: username, password: hash});
        await UserProfile.create({ user_id: user.user_id });
        res.status(200).send({ msg: 'Zarejestrowano' });
    } else {
        res.status(400).send({ msg: `Użytkownik o podanym email'u lub nazwie już istnieje` });
    }
});

server.get('/users', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;

    const users = await User.findAll({
        attributes: { exclude: ['password'] },
        limit: limit,
        offset: offset
    });

    res.json(users);
});

server.get('/userProfile', async (req, res) => {
    const user = await req.session.user;
    const userProfile = await UserProfile.findOne({
        where: { user_id: user.user_id }
    });

    res.json(userProfile);
});

server.post('/logout', (req, res) => {
    req.session.destroy();
    
    res.status(200).send({ msg: 'Sesja zniszczona' })
});

server.post('/role', (req, res) => {
    req.session.user ? res.json({ role: req.session.user.role }) : res.json();
});

server.get('/session', (req, res) => {
    res.json(req.session);
});
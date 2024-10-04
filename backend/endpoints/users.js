import {server} from '../server.js';
import {Op} from 'sequelize';
import * as pkg from 'argon2';
import {User} from '../models/User.js';
import {UserProfile} from '../models/UserProfile.js';
import {asyncHandler, getPagination} from "../utils.js";

const argon2 = pkg;
import('../dbRelations.js');

server.post('/signin', asyncHandler(async (req, res, next) => {
    const user = await User.findOne({
        where: {[Op.or]: [{username: await req.body.username}, {email: await req.body.username}]}
    });

    if (user && await argon2.verify(user.password, await req.body.password)) {
        req.session.user = user;
        res.status(200).send(req.session.user.role);
    } else {
        res.status(404).send({msg: 'Nieprawidłowa nazwa użytkownika lub hasło'});
    }
}));

server.post('/signup', asyncHandler(async (req, res, next) => {
    const email = await req.body.email;
    const username = await req.body.username;
    const password = await req.body.password;

    const hash = await argon2.hash(password);
    await User.create({
        email: email,
        username: username,
        password: hash
    });

    res.json({message: 'Zarejestrowano'});
}));

server.get('/users', asyncHandler(async (req, res, next) => {
    const {limit, offset} = getPagination(req);

    const users = await User.findAll({
        attributes: {exclude: ['password']},
        limit: limit,
        offset: offset
    });

    res.json(users);
}));

server.get('/userProfile', asyncHandler(async (req, res, next) => {
    const user = await req.session.user;

    let userProfile = await UserProfile.findOne({
        include: {
            model: User,
            attributes: ['username']
        },
        where: {
            user_id: user.user_id
        }
    });

    userProfile = JSON.parse(JSON.stringify(userProfile));
    if (userProfile) {
        userProfile.username = userProfile.User.username;
        delete userProfile.User;
    }

    res.json(userProfile);
}));

server.delete('/deleteUser', async (req, res) => {
    const user = await req.session.user;

    await User.destroy({where: {user_id: user.user_id}});

    res.send();
});

server.post('/logout', (req, res) => {
    req.session.destroy();

    res.status(200).send({msg: 'Sesja zniszczona'})
});

server.post('/role', (req, res) => {
    req.session.user ? res.json({role: req.session.user.role}) : res.json();
});

server.get('/session', (req, res) => {
    res.json(req.session);
});


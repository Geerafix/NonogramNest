import {server} from '../server.js';
import {Op} from 'sequelize';
import * as pkg from 'argon2';
import {User} from '../models/User.js';
import {UserProfile} from '../models/UserProfile.js';
import {asyncHandler, authHandler, getPagination} from "../utils.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config({path: '../../.env'});

const argon2 = pkg;
import('../dbRelations.js');

server.post('/signin', asyncHandler(async (req, res, next) => {
    const user = await User.findOne({
        where: {[Op.or]: [{username: await req.body.username}, {email: await req.body.username}]}
    });

    if (user && await argon2.verify(user.password, await req.body.password)) {
        const token = jwt.sign(
            JSON.stringify(user),
            process.env.JWT_SECRET,
        );
        res.cookie('token', token, {httpOnly: true});
        res.status(200).json(token);
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

server.get('/users', authHandler, asyncHandler(async (req, res, next) => {
    const {limit, offset} = getPagination(req);

    const users = await User.findAll({
        attributes: {exclude: ['password']},
        limit: limit,
        offset: offset
    });

    res.json(users);
}));

server.get('/profile', authHandler, asyncHandler(async (req, res, next) => {
    const user = await req.user;

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
    const user = await req.user;

    await User.destroy({where: {user_id: user.user_id}});

    res.json();
});

server.post('/logout', authHandler, asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.status(200).send({msg: 'Sesja zniszczona'});
}));

server.post('/role', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) {
        res.json({role: ''})
    }

    res.json({role: user.role});
}));


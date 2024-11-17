import {server} from '../server.js';
import {Op} from 'sequelize';
import * as pkg from 'argon2';
import dotenv from "dotenv";
import {asyncHandler, authHandler, getPagination} from "../utils.js";
import {User} from '../models/User.js';
import {UserProfile} from '../models/UserProfile.js';
import {Message} from "../models/Message.js";
import {Achievement} from "../models/Achievement.js";
import {UserAchievement} from "../models/UserAchievement.js";

dotenv.config({path: '../../.env'});

const argon2 = pkg;
import('../relations.js');

server.get('/user/achievements', authHandler, asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);
    const user = await req.user;

    const achievements = await Achievement.findAll({
        include: {
            model: UserAchievement,
            attributes: [],
            where: {[Op.or]: [{user_id: null}, {user_id: user.user_id}]},
            required: false,
            duplicating: false
        },
        attributes: {
            include: ['UserAchievements.date_achieved'],
            exclude: ['type', 'criteria']
        },
        order: [[{model: UserAchievement}, 'date_achieved', 'DESC NULLS LAST']],
        limit: limit,
        offset: offset,
        raw: true
    }); 

    res.json(achievements);
}));

server.get('/user/achievements/count', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;

    const count = await Achievement.count({
        include: {model: UserAchievement, where: {user_id: user.user_id}}
    });

    res.json(count);
}));

server.get('/user/achieved', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;

    const count = await Achievement.count({
        include: {model: UserAchievement, where: {user_id: user.user_id}}
    });
    const all = await Achievement.count();

    // const percent = ((count/all) * 100).toFixed(0).concat('%');

    res.json(count + '/' + all);
}));

server.get('/profile', authHandler, async (req, res) => {
    const user = await req.user;

    const userProfile = await UserProfile.findOne({
        include: {
            model: User,
            attributes: [],
        },
        attributes: {include: ['User.username']},
        where: {user_id: user.user_id},
        raw: true
    });

    res.json(userProfile);
});

server.put('/profile/username', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const username = await req.body.username;

    await User.update({username: username}, {where: {user_id: user.user_id}});

    res.json();
}));

server.put('/profile/pfp', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const pfp = await req.body.pfp;

    await UserProfile.update({pfp: pfp}, {where: {user_id: user.user_id}});

    res.json();
}));

server.put('/profile/bio', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const bio = await req.body.bio;

    await UserProfile.update({bio: bio}, {where: {user_id: user.user_id}});

    res.json();
}));

server.put('/profile/password', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const currentPassword = await req.body.currentPassword;
    const newPassword = await req.body.newPassword;

    const userData = await User.findOne({where: {user_id: user.user_id}});

    if (userData && await argon2.verify(userData.password, currentPassword)) {
        const hash = await argon2.hash(newPassword);
        await User.update({password: hash}, {where: {user_id: user.user_id}});

        res.status(200).send();
    } else {
        res.status(404).send();
    }
}));

server.put('/profile/email', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const email = await req.body.email;

    await User.update({email: email}, {where: {user_id: user.user_id}});

    res.json();
}));

server.post('/profile/message', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const title = await req.body.title;
    const content = await req.body.content;

    await Message.create({
        user_id: user.user_id,
        title: title,
        content: content
    });

    res.json();
}));

server.post('/logout', authHandler, asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.status(200).send({msg: 'Sesja zniszczona'});
}));

server.post('/role', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) res.json({role: ''})

    res.json({role: user.role});
}));


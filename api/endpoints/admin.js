import {server} from "../server.js";
import {asyncHandler, authHandler, getPagination} from "../utils.js";
import {CreatedPuzzle} from "../models/CreatedPuzzle.js";
import {Puzzle} from "../models/Puzzle.js";
import {User} from "../models/User.js";
import {Op} from "sequelize";
import {Message} from "../models/Message.js";
import * as argon2 from "argon2";
import {Achievement} from "../models/Achievement.js";

server.get('/puzzles', authHandler, asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);

    const puzzles = await Puzzle.findAll({
        limit: limit,
        offset: offset
    });

    res.json(puzzles);
}));

server.get('/users', authHandler, asyncHandler(async (req, res, next) => {
    const {limit, offset} = getPagination(req);
    const search = `%${req.query.search}%` || '%%';
    const option = req.query.option;

    const users = await User.findAll({
        attributes: {exclude: ['password']},
        where: {
            role: 'user',
            username: {[Op.iLike]: option === 'name' ? search : '%%'},
            email: {[Op.iLike]: option === 'email' ? search : '%%'}
        },
        limit: limit,
        offset: offset
    });

    res.json(users);
}));

server.get('/user', authHandler, asyncHandler(async (req, res, next) => {
    const user_id = req.query.user_id;

    const user = await User.findOne({
        where: {user_id: user_id}
    });

    res.json(user);
}));

server.delete('/deleteUser', async (req, res) => {
    const userId = req.query.userId;
    await User.destroy({where: {user_id: userId}});

    res.json();
});

server.put('/user', authHandler, asyncHandler(async (req, res, next) => {
    const user = await req.body.user;

    const updatedUser = await User.findOne({
        where: { user_id: user.user_id }
    });

    updatedUser.email = user.email;
    updatedUser.username = user.username;
    updatedUser.role = user.role;

    if (user.password !== updatedUser.password) {
        updatedUser.password = await argon2.hash(user.password);
    }

    await updatedUser.save();

    res.json(user);
}));

server.get('/admins', authHandler, asyncHandler(async (req, res, next) => {
    const {limit, offset} = getPagination(req);
    const search = `%${req.query.search}%` || '%%';
    const option = req.query.option;

    const users = await User.findAll({
        attributes: {exclude: ['password']},
        where: {
            role: 'admin',
            username: {[Op.iLike]: option === 'name' ? search : '%%'},
            email: {[Op.iLike]: option === 'email' ? search : '%%'},
        },
        limit: limit,
        offset: offset
    });

    res.json(users);
}));

server.get('/admin/achievements', authHandler, asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);
    const search = `%${req.query.search}%` || '%%';
    const option = req.query.option;

    const achievements = await Achievement.findAll({
        limit: limit,
        offset: offset,
        raw: true
    });

    res.json(achievements);
}));

server.post('/admin/achievement', authHandler, asyncHandler(async (req, res) => {
    const achievement = await req.body.achievement;

    await Achievement.create({
        name: achievement.name,
        description: achievement.description,
        type: achievement.type,
        criteria: achievement.criteria
    });

    res.json();
}));

server.put('/admin/achievement', authHandler, asyncHandler(async (req, res) => {
    const achievement = await req.body.achievement;

    await Achievement.update({
        name: achievement.name,
        description: achievement.description,
        type: achievement.type,
        criteria: achievement.criteria
        }, {
        where: {
            achievement_id: achievement.id
        }
    });

    res.json();
}));

server.delete('/admin/achievement', authHandler, asyncHandler(async (req, res) => {
    const id = req.query.achievement_id;
    await Achievement.destroy({where: {achievement_id: id}});

    res.json();
}));

server.get('/messages', authHandler, asyncHandler(async (req, res, next) => {
    const {limit, offset} = getPagination(req);

    const messages = await Message.findAll({
        include: {
          model: User,
          attributes: [],
        },
        attributes: {
            exclude: ['user_id'],
            include: [
                'User.username',
                'title',
                'content',
                'date'
            ]
        },
        order: [['date', 'ASC']],
        limit: limit,
        offset: offset,
        raw: true
    });

    res.json(messages);
}));

server.delete('/message', authHandler, asyncHandler(async (req, res, next) => {
    const messageId = req.query.messageId;
    const messages = await Message.destroy({where: {id: messageId}});

    res.json(messages);
}));


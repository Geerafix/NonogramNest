import {server} from "../server.js";
import {Op} from "sequelize";
import * as argon2 from "argon2";
import {asyncHandler, authHandler, getPagination} from "../utils.js";
import {CreatedPuzzle} from "../models/CreatedPuzzle.js";
import {Puzzle} from "../models/Puzzle.js";
import {User} from "../models/User.js";
import {Message} from "../models/Message.js";
import {Achievement} from "../models/Achievement.js";

server.get('/admin/puzzles', authHandler, asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);
    const search = `%${req.query.search}%` || '%%';
    const option = req.query.option;

    const puzzles = await CreatedPuzzle.findAll({
        include: [{
            model: Puzzle,
            attributes: []
        }, {
            model: User,
            attributes: [],
            where: {username: {[Op.iLike]: option === 'creator' ? search : '%%'}}
        }],
        where: {
            name: {[Op.iLike]: option === 'name' ? search : '%%'},
            is_public: false
        },
        attributes: ['created_id', 'name', 'Puzzle.size', 'User.username', 'is_public', 'Puzzle.excluded_tiles'],
        order: [['date', 'DESC']],
        limit: limit,
        offset: offset,
        raw: true
    });

    res.json(puzzles);
}));
 
server.get('/admin/puzzle', authHandler, async (req, res) => {
    const id = req.query.puzzleId || 6;
 
    const puzzle = await CreatedPuzzle.findOne({
        include: {
            model: Puzzle,
            attributes: []
        },
        where: {
            created_id: id
        },
        attributes: {
            include: ['Puzzle.excluded_tiles']
        },
        raw: true
    }); 

    res.json(puzzle);
});

server.put('/admin/puzzle', authHandler, async (req, res) => {
    const id = await req.body.puzzleId;
    const board = await req.body.board;

    const createdPuzzle = await CreatedPuzzle.findOne({where: {created_id: id}});
    const puzzle = await Puzzle.findOne({where: {puzzle_id: createdPuzzle.puzzle_id}})

    createdPuzzle.is_public = true;
    puzzle.excluded_tiles = JSON.stringify(board);

    await puzzle.save();
    await createdPuzzle.save();
 
    res.json();
});

server.delete('/admin/puzzle', authHandler, async (req, res) => {
    const id = req.query.puzzleId;

    await CreatedPuzzle.destroy({where: {created_id: id}});
 
    res.json();
});

server.get('/admin/users', authHandler, asyncHandler(async (req, res) => {
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

server.get('/admin/user', authHandler, asyncHandler(async (req, res) => {
    const user_id = req.query.user_id;

    const user = await User.findOne({where: {user_id: user_id}});

    res.json(user);
}));

server.delete('/admin/deleteUser', async (req, res) => {
    const userId = req.query.userId;
    await User.destroy({where: {user_id: userId}});

    res.json();
});

server.put('/admin/user', authHandler, asyncHandler(async (req, res) => {
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

server.get('/admin/admins', authHandler, asyncHandler(async (req, res) => {
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

    const achievements = await Achievement.findAll({
        limit: limit,
        offset: offset,
        raw: true
    });

    res.json(achievements);
}));

server.post('/admin/achievement', authHandler, async (req, res) => {
    const achievement = await req.body.achievement;

    await Achievement.create({
        name: achievement.name,
        description: achievement.description,
        type: achievement.type,
        criteria: achievement.criteria
    });

    res.json();
});

server.put('/admin/achievement', authHandler, asyncHandler(async (req, res) => {
    const achievement = await req.body.achievement;

    await Achievement.update({
        name: achievement.name,
        description: achievement.description,
        type: achievement.type,
        criteria: achievement.criteria
        }, {
        where: {achievement_id: achievement.id}
    });

    res.json();
}));

server.delete('/admin/achievement', authHandler, asyncHandler(async (req, res) => {
    const id = req.query.achievement_id;
    
    await Achievement.destroy({where: {achievement_id: id}});

    res.json();
}));

server.get('/admin/messages', authHandler, asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);

    const messages = await Message.findAll({
        include: {
          model: User,
          attributes: [],
        },
        attributes: {
            exclude: ['user_id'],
            include: ['User.username', 'title', 'content', 'date']
        },
        order: [['date', 'ASC']],
        limit: limit,
        offset: offset,
        raw: true
    });

    res.json(messages);
}));

server.delete('/admin/message', authHandler, asyncHandler(async (req, res) => {
    const messageId = req.query.messageId;
    const messages = await Message.destroy({where: {id: messageId}});

    res.json(messages);
}));


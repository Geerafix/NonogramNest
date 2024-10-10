import {server} from "../server.js";
import {asyncHandler, authHandler, getPagination} from "../utils.js";
import {CreatedPuzzle} from "../models/CreatedPuzzle.js";
import {Puzzle} from "../models/Puzzle.js";
import {User} from "../models/User.js";
import {Op} from "sequelize";

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

    const users = await User.findAll({
        attributes: {exclude: ['password']},
        limit: limit,
        offset: offset
    });

    res.json(users);
}));

server.get('/admin/achievements', authHandler, asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);
    const search = `%${req.query.search}%` || '%%';
    const option = req.query.option;
    const user = await req.user;

    const puzzles = await CreatedPuzzle.findAll({
        include: [{
            model: Puzzle,
            attributes: ['size']
        }, {
            model: User,
            attributes: ['username'],
            where: {
                username: {[Op.iLike]: option === 'creator' ? search : '%%'},
                user_id: {[Op.ne]: user.user_id}
            }
        }], 
        where: {name: {[Op.iLike]: option === 'name' ? search : '%%'}},
        attributes: ['created_id', 'name'],
        limit: limit,
        offset: offset,
        order: [['created_id', 'ASC']],
        raw: true
    });

    res.json(puzzles);
}));

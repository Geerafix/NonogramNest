import {server} from "../server.js";
import {asyncHandler, authHandler, getPagination} from "../utils.js";
import {CreatedPuzzle} from "../models/CreatedPuzzle.js";
import {Puzzle} from "../models/Puzzle.js";
import {User} from "../models/User.js";
import {Op} from "sequelize";

server.get('/community/puzzles', authHandler, asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);
    const search = `%${req.query.search}%` || '%%';
    const option = req.query.option;

    const puzzles = await CreatedPuzzle.findAll({
        include: [{
            model: Puzzle,
            attributes: ['size'],
        }, {
            model: User,
            attributes: ['username'],
            where: {username: {[Op.iLike]: option === 'creator' ? search : '%%'}}
        }],
        where: {name: {[Op.iLike]: option === 'name' ? search : '%%'}},
        attributes: ['created_id', 'name'],
        limit: limit,
        offset: offset,
        raw: true
    });

    res.json(puzzles);
}));

server.get('/community/puzzle', authHandler, asyncHandler(async (req, res) => {
    const id = parseInt(req.query.created_id);

    const communityPuzzle = await Puzzle.findOne({
        include: [{
            model: CreatedPuzzle,
            attributes: [],
            where: {created_id: id}
        }],
    });

    res.json(communityPuzzle);
}));

server.post('/community/created', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;

    const clues_x = await req.body.cluesX;
    const clues_y = await req.body.cluesY;
    const size = await req.body.size;
    const excluded_tiles = await req.body.excludedTiles;

    const puzzle = await Puzzle.create({
        clues_x: clues_x,
        clues_y: clues_y,
        size: size,
        excluded_tiles: excluded_tiles
    });

    const name = await req.body.name;

    await CreatedPuzzle.create({
        user_id: user.user_id,
        puzzle_id: puzzle.puzzle_id,
        name: name,
    });

    res.json({});
}));
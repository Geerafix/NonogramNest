import {server} from "../server.js";
import {asyncHandler, getPagination} from "../utils.js";
import {CreatedPuzzle} from "../models/CreatedPuzzle.js";
import {Puzzle} from "../models/Puzzle.js";
import {User} from "../models/User.js";
import {Op} from "sequelize";

server.get('/community/puzzles', asyncHandler(async (req, res) => {
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

server.get('/community/puzzle', asyncHandler(async (req, res) => {
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

server.post('/community/created', asyncHandler(async (req, res) => {
    const puzzle = await Puzzle.create({
        clues_x: await req.body.cluesX,
        clues_y: await req.body.cluesY,
        size: await req.body.size,
        excluded_tiles: await req.body.excludedTiles
    });

    await CreatedPuzzle.create({
        user_id: await req.session.user.user_id,
        puzzle_id: puzzle.puzzle_id,
        name: `Nonogram ${puzzle.puzzle_id}`,
    });

    res.json({});
}));
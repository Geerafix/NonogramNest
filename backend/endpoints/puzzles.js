import {server} from '../server.js';
import {Puzzle} from '../models/Puzzle.js';
import {SolvedPuzzle} from '../models/SolvedPuzzle.js';
import {asyncHandler, getPagination} from "../utils.js";

import('../dbRelations.js');

server.get('/puzzles', asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);

    const puzzles = await Puzzle.findAll({
        limit: limit,
        offset: offset
    });

    res.json(puzzles);
}));

server.post('/puzzles', asyncHandler(async (req, res) => {
    const puzzle = await Puzzle.create({
        clues_x: await req.body.cluesX,
        clues_y: await req.body.cluesY,
        size: await req.body.size
    });

    res.json({id: puzzle.puzzle_id});
}));

server.post('/solved', asyncHandler(async (req, res) => {
    const user = await req.session.user;

    const solved = await SolvedPuzzle.create({
        puzzle_id: await req.body.puzzleId,
        user_id: user.user_id,
        time: await req.body.time,
        points: await req.body.points
    });

    res.json(solved);
}));

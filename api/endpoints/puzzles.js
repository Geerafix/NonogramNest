import {server} from '../server.js';
import {Puzzle} from '../models/Puzzle.js';
import {SolvedPuzzle} from '../models/SolvedPuzzle.js';
import {asyncHandler, authHandler} from "../utils.js";
import jwt from "jsonwebtoken";

import('../relations.js');

server.post('/puzzle', authHandler, asyncHandler(async (req, res) => {
    const puzzle = await Puzzle.create({
        clues_x: await req.body.cluesX,
        clues_y: await req.body.cluesY,
        size: await req.body.size
    });

    res.json({id: puzzle.puzzle_id});
}));

server.post('/puzzle/solved', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;

    const solved = await SolvedPuzzle.create({
        puzzle_id: await req.body.puzzleId,
        user_id: user.user_id,
        time: await req.body.time,
        points: await req.body.points
    });

    res.json(solved);
}));

server.post('/puzzle/save', authHandler, asyncHandler(async (req, res) => {
    const nonogram = await req.body.nonogramData;

    const saved = jwt.sign(
        JSON.stringify(nonogram),
        process.env.JWT_SECRET,
    );

    res.json(saved);
}));



server.get('/puzzle/load', authHandler, asyncHandler(async (req, res) => {
    const nonogram = req.query.nonogramData;

    jwt.verify(nonogram, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.json();
        }
        
        res.json(decoded);
    });
}));

server.post('/create/save', authHandler, asyncHandler(async (req, res) => {
    const nonogram = await req.body.nonogramData;

    const saved = jwt.sign(
        JSON.stringify(nonogram),
        process.env.JWT_SECRET,
    );

    res.json(saved);
}));


server.get('/create/load', authHandler, asyncHandler(async (req, res) => {
    const nonogram = req.query.nonogramData;

    jwt.verify(nonogram, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.json();
        }
        
        res.json(decoded);
    });
}));

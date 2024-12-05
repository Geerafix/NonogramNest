import {server} from '../server.js';
import jwt from "jsonwebtoken";
import {asyncHandler, authHandler} from "../utils.js";
import {postPuzzle, postSolved} from "../services/puzzleService.js";

server.post('/puzzle', authHandler, asyncHandler(async (req, res) => {
    const cluesX = await req.body.cluesX;
    const cluesY = await req.body.cluesY;
    const size = await req.body.size;

    const puzzle = await postPuzzle(cluesX, cluesY, size);

    res.json({id: puzzle.puzzle_id});
}));

server.post('/puzzle/solved', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const puzzle_id = req.body.puzzleId;
    const time = req.body.time;
    const points = req.body.points;

    const solved = await postSolved(user.user_id, puzzle_id, time, points);

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

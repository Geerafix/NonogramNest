import {server} from '../server.js';
import {asyncHandler, authHandler} from "../utils.js";
import {postPuzzle, postSolved, saveNonogram, loadNonogram} from "../services/puzzleService.js";

server.post('/api/puzzle', authHandler, asyncHandler(async (req, res) => {
    const cluesX = await req.body.cluesX;
    const cluesY = await req.body.cluesY;
    const size = await req.body.size;

    const puzzle = await postPuzzle(cluesX, cluesY, size);

    res.json({id: puzzle.puzzle_id});
}));

server.post('/api/puzzle/solved', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const puzzle_id = req.body.puzzleId;
    const time = req.body.time;
    const points = req.body.points;

    const solved = await postSolved(user.user_id, puzzle_id, time, points);

    res.json(solved);
}));

server.post('/api/puzzle/save', authHandler, asyncHandler(async (req, res) => {
    const nonogram = await req.body.nonogramData;
    
    const saved = saveNonogram(nonogram);
    
    res.json(saved);
}));

server.get('/api/puzzle/load', authHandler, asyncHandler(async (req, res) => {
    const nonogram = req.query.nonogramData;

    const decoded = loadNonogram(nonogram);

    res.json(decoded);
}));

server.post('/api/create/save', authHandler, asyncHandler(async (req, res) => {
    const nonogram = await req.body.nonogramData;

    const saved = saveNonogram(nonogram);

    res.json(saved);
}));


server.get('/api/create/load', authHandler, asyncHandler(async (req, res) => {
    const nonogram = req.query.nonogramData;

    const decoded = loadNonogram(nonogram);

    res.json(decoded);
}));

import { server, client } from '../server.js';
import { Puzzle } from '../models/Puzzle.js';
import { SolvedPuzzle } from '../models/SolvedPuzzle.js';

server.get('/nonograms', async (req, res) => {
    const puzzles = await Puzzle.findAll();
    res.json(puzzles);
});

server.post('/nonograms', async (req, res) => {
    const puzzle = await Puzzle.create({ 
        clues_x: await req.body.cluesX, 
        clues_y: await req.body.cluesY, 
        size: await req.body.size
    });

    res.json({ id: puzzle.puzzle_id });
});

server.post('/solved', async (req, res) => {
    const solved = await SolvedPuzzle.create({ 
        puzzle_id: await req.body.puzzleId, 
        user_id: await req.session.user.user_id, 
        time: await req.body.time, 
        points: await req.body.points
    });
    res.json(solved);
});
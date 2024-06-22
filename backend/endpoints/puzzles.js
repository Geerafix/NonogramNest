import { server } from '../server.js';
import { Op } from 'sequelize';
import { Puzzle, SolvedPuzzle, DailyChallenge } from '../models/models.js';

server.get('/puzzles', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;
    const puzzles = await Puzzle.findAll({ limit: limit, offset: offset});
    res.json(puzzles);
});

server.post('/puzzles', async (req, res) => {
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

server.post('/dailyChallenge', async (req, res) => {
    const puzzle_id = await req.body.puzzleId;
    const user_id = await req.session.user.user_id;
    const time = await req.body.time;
    const points = await req.body.points;

    const dailyChallenge = await DailyChallenge.create({ 
        puzzle_id: puzzle_id, 
        user_id: user_id, 
        time: time, 
        points: points,
    });

    res.json(dailyChallenge);
});

server.get('/dailyChallenge', async (req, res) => {
    const user_id = await req.session.user.user_id;
    const today = new Date();

    const dailyChallenge = await DailyChallenge.findOne({ 
        include: [{ model: Puzzle }],
        where: { [Op.and]: [{ user_id: user_id }, { date: today }] } 
    });

    res.json(dailyChallenge);
});

server.get('/dailyChallenges', async (req, res) => {
    const user_id = parseInt(req.body.user_id);

    const dailyChallenge = await DailyChallenge.findAll({ 
        where: { user_id: user_id } 
    });

    res.json(dailyChallenge);
});

server.put('/dailyChallenge', async (req, res) => {
    const user_id = await req.body.user_id;
    const time = await req.body.time;
    const points = await req.body.points;
    const is_solved = await req.body.isSolved;
    const today = new Date();

    const dailyChallenge = await DailyChallenge.findOne({ 
        where: { [Op.and]: [{ user_id: user_id }, { date: today }] } 
    });

    dailyChallenge.time = time;
    dailyChallenge.points = points;

    if(is_solved) {
        dailyChallenge.is_solved = true;
    }

    await dailyChallenge.save();

    res.json(dailyChallenge);
});
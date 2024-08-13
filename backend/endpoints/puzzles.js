import { server } from '../server.js';
import { Op } from 'sequelize';

import { Puzzle } from '../models/Puzzle.js';
import { SolvedPuzzle } from '../models/SolvedPuzzle.js';
import { DailyChallenge } from '../models/DailyChallenge.js';
import('../models/setup/relations.js');

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
    try {
        const user = await req.session.user;

        const solved = await SolvedPuzzle.create({ 
            puzzle_id: await req.body.puzzleId, 
            user_id: user.user_id, 
            time: await req.body.time, 
            points: await req.body.points
        });

        res.json(solved);
    } catch (error) {
        res.json(error);
    }
});


server.get('/dailyChallenge', async (req, res) => {
    
        const user = await req.session.user;
        const today = new Date();
        
        const dailyChallenge = await DailyChallenge.findOne({ 
            include: [{ model: Puzzle }],
            where: { [Op.and]: [{ user_id: user.user_id }, { date: today }] } 
        });

        console.log(dailyChallenge);
        
        res.json(dailyChallenge);

});

server.get('/dailyChallenges', async (req, res) => {
    try {    
        const user = req.session.user;

        const dailyChallenge = await DailyChallenge.findAll({ 
            where: { user_id: user.user_id } 
        });

        res.json(dailyChallenge);
    } catch (error) {
        res.json(error);
    }
});

server.get('/streak', async (req, res) => {
    try {    
        const user = req.session.user;

        let streakCount = 0;
        let yesterday = new Date(Date.now() - 86400000);

        let streak = await DailyChallenge.findOne({ 
            where: { [Op.and]: [{ user_id: user.user_id }, { date: new Date()}, { is_solved: true }]} 
        });

        if (streak !== null) streakCount += 1;

        while (streak = await DailyChallenge.findOne({ 
            where: { [Op.and]: [{ user_id: user.user_id }, { date: yesterday}, { is_solved: true }]} 
        }) !== null) {
            streakCount += 1;
            yesterday.setDate(yesterday.getDate() - 1);
            streak = await DailyChallenge.findOne({ 
                where: { [Op.and]: [{ user_id: user.user_id }, { date: yesterday}, { is_solved: true }]} 
            });
        }
        
        res.json(streakCount);
    } catch (error) {
        res.json(error);
    }
});

server.get('/dailies', async (req, res) => {
    try {
        const user = await req.session.user;
        const month = parseInt(req.query.month);
        const year = parseInt(req.query.year);

        const dailies = await DailyChallenge.findAll({ 
            where: { 
                [Op.and]: [
                    { user_id: user.user_id }, 
                    { date: { [Op.between]: [new Date(year, month, 1), new Date(year, month + 1, 0)]} },
                    { is_solved: true }
                ] 
            } 
        });

        const dailyDays = JSON.parse(JSON.stringify(dailies)).map((el) => new Date(el.date).getDate()); 

        res.json(dailyDays);
    } catch (error) {
        res.json(error);
    }
});

server.post('/dailyChallenge', async (req, res) => {
    try {
        const user = await req.session.user;
        const puzzle_id = await req.body.puzzleId;
        const time = await req.body.time;
        const points = await req.body.points;
        const answers = Array.from(Array(8), () => Array(8).fill(0));

        const dailyChallenge = await DailyChallenge.create({ 
            puzzle_id: puzzle_id, 
            user_id: user.user_id, 
            answers: JSON.stringify(answers),
            time: time, 
            points: points,
        });
    
        res.json(dailyChallenge);
    } catch (error) {
        res.json(error);
    }
}); 

server.put('/dailyChallenge', async (req, res) => {
    try {
        const user = await req.session.user;
        const time = await req.body.time;
        const points = await req.body.points;
        const is_solved = await req.body.isSolved;
        const answers = await req.body.answers;
        const today = new Date();
    
        const dailyChallenge = await DailyChallenge.findOne({ 
            where: { [Op.and]: [{ user_id: user.user_id }, { date: today }] } 
        });
    
        dailyChallenge.answers = JSON.stringify(answers);
        dailyChallenge.time = time;
        dailyChallenge.points = points;
        
        if(is_solved) dailyChallenge.is_solved = true;
        
        await dailyChallenge.save();
    
        res.json(dailyChallenge);
    } catch (error) {
        res.json(error);
    } 
});
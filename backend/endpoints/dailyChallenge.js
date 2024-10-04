import {server} from "../server.js";
import {DailyChallenge} from "../models/DailyChallenge.js";
import {Op} from "sequelize";
import {Puzzle} from "../models/Puzzle.js";
import {asyncHandler} from "../utils.js";

server.post('/dailyChallenge', asyncHandler(async (req, res) => {
    const puzzle_id = await req.body.puzzleId;
    const time = await req.body.time;
    const points = await req.body.points;
    const answers = Array.from(Array(8), () => Array(8).fill(0));

    const user = await req.session.user;

    const dailyChallenge = await DailyChallenge.create({
        puzzle_id: puzzle_id,
        user_id: user.user_id,
        answers: JSON.stringify(answers),
        time: time,
        points: points,
    });

    res.json(dailyChallenge);
}));

server.put('/dailyChallenge', asyncHandler(async (req, res) => {
    const time = await req.body.time;
    const points = await req.body.points;
    const is_solved = await req.body.isSolved;
    const answers = await req.body.answers;
    const today = new Date();

    const user = await req.session.user;

    const dailyChallenge = await DailyChallenge.findOne({
        where: {[Op.and]: [{user_id: user.user_id}, {date: today}]}
    });

    dailyChallenge.answers = JSON.stringify(answers);
    dailyChallenge.time = time;
    dailyChallenge.points = points;

    if (is_solved) dailyChallenge.is_solved = true;

    await dailyChallenge.save();

    res.json(dailyChallenge);
}));

server.get('/dailyChallenge', asyncHandler(async (req, res) => {
    const today = new Date();

    const user = await req.session.user;

    const dailyChallenge = await DailyChallenge.findOne({
        include: [{model: Puzzle}],
        where: {[Op.and]: [{user_id: user.user_id}, {date: today}]}
    });

    res.json(dailyChallenge);
}));

server.get('/dailyChallenges', asyncHandler(async (req, res) => {
    const user = req.session.user;

    const dailyChallenge = await DailyChallenge.findAll({
        where: {user_id: user.user_id}
    });

    res.json(dailyChallenge);
}));

server.get('/streak', asyncHandler(async (req, res) => {
    let streakCount = 0;
    let yesterday = new Date(Date.now() - 86400000);

    const user = req.session.user;

    let streak = await DailyChallenge.findOne({
        where: {[Op.and]: [{user_id: user.user_id}, {date: new Date()}, {is_solved: true}]}
    });

    if (streak !== null) streakCount += 1;

    while (streak = await DailyChallenge.findOne({
        where: {[Op.and]: [{user_id: user.user_id}, {date: yesterday}, {is_solved: true}]}
    }) !== null) {
        streakCount += 1;
        yesterday.setDate(yesterday.getDate() - 1);
        streak = await DailyChallenge.findOne({
            where: {[Op.and]: [{user_id: user.user_id}, {date: yesterday}, {is_solved: true}]}
        });
    }

    res.json(streakCount);
}));

server.get('/dailies', asyncHandler(async (req, res) => {
    const month = !Number.isNaN(parseInt(req.query.month)) ? parseInt(req.query.month) : (new Date()).getMonth();
    const year = !Number.isNaN(parseInt(req.query.year)) ? parseInt(req.query.year) : (new Date().getFullYear());

    const user = await req.session.user;

    const dailies = await DailyChallenge.findAll({
        where: {
            [Op.and]: [
                {user_id: user.user_id},
                {date: {[Op.between]: [new Date(year, month, 1), new Date(year, month + 1, 0)]}},
                {is_solved: true}
            ]
        }
    });

    const dailyDays = JSON.parse(JSON.stringify(dailies)).map((el) => new Date(el.date).getDate());

    res.json(dailyDays);
}));
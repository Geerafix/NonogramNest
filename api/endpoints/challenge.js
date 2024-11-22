import {server} from "../server.js";
import {DATEONLY, Op} from "sequelize";
import {asyncHandler, authHandler} from "../utils.js";
import {DailyChallenge} from "../models/DailyChallenge.js";
import {Puzzle} from "../models/Puzzle.js";
import {getPointsBySize} from "../../src/scripts/puzzleScripts.js";

server.get('/challenges', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;

    const dailyChallenge = await DailyChallenge.findAll({where: {user_id: user.user_id}});

    res.json(dailyChallenge);
}));

server.get('/challenge', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;
    const today = new Date();

    const dailyChallenge = await DailyChallenge.findOne({
        include: [{model: Puzzle}],
        where: {[Op.and]: [{user_id: user.user_id}, {date: today}]}
    });

    res.json(dailyChallenge);
}));

server.post('/challenge', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const puzzle_id = await req.body.puzzleId;
    const time = await req.body.time;
    const points = await req.body.points;
    const answers = await req.body.answers

    const dailyChallenge = await DailyChallenge.create({
        puzzle_id: puzzle_id,
        user_id: user.user_id,
        answers: JSON.stringify(answers),
        time: time,
        points: points,
    });

    res.json(dailyChallenge);
}));

server.put('/challenge', authHandler, (async (req, res) => {
    const user = await req.user;
    const time = await req.body.time;
    const points = await req.body.points;
    const bonus = await req.body.bonus;
    const is_solved = await req.body.isSolved;
    const answers = await req.body.answers;
    const today = new Date();

    const dailyChallenge = await DailyChallenge.findOne({
        where: {[Op.and]: [{user_id: user.user_id}, {date: today}]}
    });

    dailyChallenge.answers = JSON.stringify(answers);
    dailyChallenge.time = time;
    dailyChallenge.points = points;

    if (is_solved) {
        const streak = await getStreak(user);
        dailyChallenge.is_solved = true;
        dailyChallenge.points = (parseFloat(points + (getPointsBySize(answers.length) * (streak / 100))) + bonus);
    }

    await dailyChallenge.save();

    res.json(dailyChallenge);
}));

server.get('/challenge/streak', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;
    const streak = await getStreak(user);
    res.json(streak);
}));

server.get('/challenge/dailies', authHandler, asyncHandler(async (req, res) => {
    const month = !Number.isNaN(parseInt(req.query.month)) ? parseInt(req.query.month) : (new Date()).getMonth();
    const year = !Number.isNaN(parseInt(req.query.year)) ? parseInt(req.query.year) : (new Date().getFullYear());

    const user = await req.user;

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

server.get('/challenge/info', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;
    const date = req.query.date;

    console.log(date)

    const challenge = await DailyChallenge.findOne({
        where: {[Op.and]: [{user_id: user.user_id}, {date: date}]}
    });

    res.json(challenge);
}));

const getStreak = async (user) => {
    let streak = 0;
    const today = new Date();
    const yesterday = new Date(today).setDate(today.getDate() - 1); 
    const todayDateonly = today.toLocaleDateString();
    const yesterdayDateonly = new Date(yesterday).toLocaleDateString();

    let dailyDays = await DailyChallenge.findAll({
        where: {user_id: user.user_id},
        order: [['date', 'DESC']]
    });

    if (dailyDays.length === 0) return 0;

    const firstDailyDateonly = new Date(dailyDays[0].date).toLocaleDateString();

    if (![yesterdayDateonly, todayDateonly].includes(firstDailyDateonly)) return 0;

    if (firstDailyDateonly === todayDateonly) {
        if (dailyDays[0].is_solved){
            ++streak;
        }
        dailyDays = dailyDays.slice(1);
    }
    
    let acc = new Date(dailyDays[0] ? dailyDays[0].date : null);
    for (const challenge of dailyDays) {
        if (challenge.is_solved && new Date(challenge.date).getDate() == acc.getDate()) {
            ++streak;
            acc = new Date(acc.setDate(acc.getDate() - 1));
        }
        else break;
    }

    return streak;
}
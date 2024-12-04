import {server} from "../server.js";
import {asyncHandler, authHandler} from "../utils.js";
import {
    getDailyChallenges,
    getDailyChallenge,
    postDailyChallenge,
    updateDailyChallenge,
    getDailies,
    getStreak, getChallengeInfo
} from "../services/challengeService.js";

server.get('/challenges', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;

    const dailyChallenge = await getDailyChallenges(user.user_id)

    res.json(dailyChallenge);
}));

server.get('/challenge', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;

    const dailyChallenge = await getDailyChallenge(user.user_id)

    res.json(dailyChallenge);
}));

server.post('/challenge', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const puzzle_id = await req.body.puzzleId;
    const time = await req.body.time;
    const points = await req.body.points;
    const answers = await req.body.answers

    const dailyChallenge = await postDailyChallenge(user.user_id, puzzle_id, time, points, answers);

    res.json(dailyChallenge);
}));

server.put('/challenge', authHandler, (async (req, res) => {
    const user = await req.user;
    const time = await req.body.time;
    const points = await req.body.points;
    const bonus = await req.body.bonus;
    const is_solved = await req.body.isSolved;
    const answers = await req.body.answers;

    const dailyChallenge = await updateDailyChallenge(user.user_id, answers, time, points, bonus, is_solved);

    res.json(dailyChallenge);
}));

server.get('/challenge/streak', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;

    const streak = await getStreak(user.user_id);

    res.json(streak);
}));

server.get('/challenge/dailies', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const {month, year} = req.query;

    const dailyDays = await getDailies(user.user_id, month, year);

    res.json(dailyDays);
}));

server.get('/challenge/info', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;
    const date = req.query.date;

    const challenge = await getChallengeInfo(user.user_id, date);

    res.json(challenge);
}));
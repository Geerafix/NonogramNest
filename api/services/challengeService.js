import {DailyChallenge} from "../models/DailyChallenge.js";
import {Puzzle} from "../models/Puzzle.js";
import {Op} from "sequelize";
import {getPointsBySize} from "../../src/scripts/puzzleScripts.js";

export const getDailyChallenges = async (user_id) => {
    return await DailyChallenge.findAll({
        where: {user_id: user_id}
    });
};

export const getDailyChallenge = async (user_id) => {
    const today = new Date();

    return await DailyChallenge.findOne({
        include: [{model: Puzzle}],
        where: {[Op.and]: [{user_id: user_id}, {date: today}]}
    });
};

export const postDailyChallenge = async (user_id, puzzle_id, answers, time, points) => {
    return await DailyChallenge.create({
        puzzle_id: puzzle_id,
        user_id: user_id,
        answers: JSON.stringify(answers),
        time: time,
        points: points,
    });
}

export const updateDailyChallenge = async (user_id, answers, time, points, bonus, is_solved) => {
    const today = new Date();

    const dailyChallenge = await DailyChallenge.findOne({
        where: {[Op.and]: [{user_id: user_id}, {date: today}]}
    });

    dailyChallenge.answers = JSON.stringify(answers);
    dailyChallenge.time = time;
    dailyChallenge.points = points;

    if (is_solved) {
        const streak = await getStreak(user_id);
        dailyChallenge.is_solved = true;
        dailyChallenge.points = (parseFloat(points + (getPointsBySize(answers.length) * (streak / 100))) + bonus);
    }

    await dailyChallenge.save();

    return dailyChallenge;
}

export const getDailies = async (user_id, m, y) => {
    const month = !Number.isNaN(parseInt(m)) ? parseInt(m) : (new Date()).getMonth();
    const year = !Number.isNaN(parseInt(y)) ? parseInt(y) : (new Date().getFullYear());

    const dailies = await DailyChallenge.findAll({
        where: {
            [Op.and]: [
                {user_id: user_id},
                {date: {[Op.between]: [new Date(year, month, 1), new Date(year, month + 1, 0)]}},
                {is_solved: true}
            ]
        }
    });

    return JSON.parse(JSON.stringify(dailies)).map((el) => new Date(el.date).getDate());
}

export const getChallengeInfo = async (user_id, date) => {
    return await DailyChallenge.findOne({
        where: {[Op.and]: [{user_id: user_id}, {date: date}, {is_solved: true}]}
    });
}

export const getStreak = async (user_id) => {
    let streak = 0;
    const today = new Date();
    const yesterday = new Date(today).setDate(today.getDate() - 1);
    const todayDateonly = today.toLocaleDateString();
    const yesterdayDateonly = new Date(yesterday).toLocaleDateString();

    let dailyDays = await DailyChallenge.findAll({
        where: {user_id: user_id},
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
        if (challenge.is_solved && new Date(challenge.date).getDate() === acc.getDate()) {
            ++streak;
            acc = new Date(acc.setDate(acc.getDate() - 1));
        }
        else break;
    }

    return streak;
}
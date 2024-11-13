import {User} from "./models/User.js";
import {UserProfile} from "./models/UserProfile.js";
import {Puzzle} from "./models/Puzzle.js";
import {SolvedPuzzle} from "./models/SolvedPuzzle.js";
import {DailyChallenge} from "./models/DailyChallenge.js";
import {Score} from "./models/Score.js";
import {CreatedPuzzle} from "./models/CreatedPuzzle.js";
import {UserAchievement} from "./models/UserAchievement.js";
import {Achievement} from "./models/Achievement.js";
import {Message} from "./models/Message.js";
import {sequelize, server} from "./server.js";
import {asyncHandler} from "./utils.js";
import * as argon2 from "argon2";

User.hasMany(SolvedPuzzle, {foreignKey: 'user_id'});
User.hasMany(DailyChallenge, {foreignKey: 'user_id'});
User.hasMany(CreatedPuzzle, {foreignKey: 'user_id'});
User.hasOne(UserProfile, {foreignKey: 'user_id'});
User.hasOne(Score, {foreignKey: 'user_id'});
User.hasMany(UserAchievement, {foreignKey: 'user_id'});
User.hasMany(Message, {foreignKey: 'user_id'});

UserAchievement.belongsTo(User, {foreignKey: 'user_id'});

UserProfile.belongsTo(User, {foreignKey: 'user_id'});

Score.belongsTo(User, {foreignKey: 'user_id'});

Puzzle.hasMany(SolvedPuzzle, {foreignKey: 'puzzle_id'});
Puzzle.hasMany(DailyChallenge, {foreignKey: 'puzzle_id'});
Puzzle.hasOne(CreatedPuzzle, {foreignKey: 'puzzle_id'});

SolvedPuzzle.belongsTo(User, {foreignKey: 'user_id'});
SolvedPuzzle.belongsTo(Puzzle, {foreignKey: 'puzzle_id'});

DailyChallenge.belongsTo(User, {foreignKey: 'user_id'});
DailyChallenge.belongsTo(Puzzle, {foreignKey: 'puzzle_id'});

CreatedPuzzle.belongsTo(User, {foreignKey: 'user_id'});
CreatedPuzzle.belongsTo(Puzzle, {foreignKey: 'puzzle_id'});

Achievement.hasMany(UserAchievement, {foreignKey: 'achievement_id'});

Message.belongsTo(User, {foreignKey: 'user_id'});

sequelize.addHook('afterBulkSync', async (options) => {
    const names = [
        'adam', 'maks', 'kuba', 'kacper', 'szymon', 'mateusz', 'rafal', 'filip', 'dawid', 'lukasz', 'mikolaj', 'tomek'
    ]

    const accounts = [];

    for (const name of names) {
        accounts.push({
            email: name.concat('@wp.pl'), username: name.concat(name.length).concat(name.length + 1), password: await argon2.hash(name),
        })
    }

    for (const user of accounts) {
        await User.create({
            email: user.email, username: user.username, password: user.password
        });
    }

    await User.create({
        email: 'admin@wp.pl', username: 'admin', password: await argon2.hash('admin'), role: 'admin'
    });

    await Achievement.create({
        name: 'Amator klasyki (I)', description: 'Ukończ 1 nonogram w trybie klasycznym.',
        type: 'solved_puzzles', criteria: 1
    });

    await Achievement.create({
        name: 'Amator klasyki (II)', description: 'Ukończ 5 nonogramy w trybie klasycznym.',
        type: 'solved_puzzles', criteria: 5
    });

    await Achievement.create({
        name: 'Amator klasyki (III)', description: 'Ukończ 10 nonogramów w trybie klasycznym.',
        type: 'solved_puzzles', criteria: 10
    });

    await Achievement.create({
        name: 'Fan klasyki (I)', description: 'Ukończ 20 nonogramów w trybie klasycznym.',
        type: 'solved_puzzles', criteria: 20
    });

    await Achievement.create({
        name: 'Fan klasyki (II)', description: 'Ukończ 30 nonogramów w trybie klasycznym.',
        type: 'solved_puzzles', criteria: 30
    });

    await Achievement.create({
        name: 'Fan klasyki (III)', description: 'Ukończ 40 nonogramów w trybie klasycznym.',
        type: 'solved_puzzles', criteria: 40
    });

    await Achievement.create({
        name: 'Nowicjusz wyzwań (I)', description: 'Ukończ 1 nonogram w trybie codzienne wyzwanie.',
        type: 'solved_challenges', criteria: 1
    });

    await Achievement.create({
        name: 'Nowicjusz wyzwań (II)', description: 'Ukończ 5 nonogramy w trybie codzienne wyzwanie.',
        type: 'solved_challenges', criteria: 5
    });

    await Achievement.create({
        name: 'Nowicjusz wyzwań (III)', description: 'Ukończ 10 nonogramów w trybie codzienne wyzwanie.',
        type: 'solved_challenges', criteria: 10
    });

    await Achievement.create({
        name: 'Entuzjasta wyzwań (I)', description: 'Ukończ 20 nonogramów w trybie codzienne wyzwanie.',
        type: 'solved_challenges', criteria: 20
    });

    await Achievement.create({
        name: 'Entuzjasta wyzwań (II)', description: 'Ukończ 30 nonogramów w trybie codzienne wyzwanie.',
        type: 'solved_challenges', criteria: 30
    });

    await Achievement.create({
        name: 'Entuzjasta wyzwań (III)', description: 'Ukończ 40 nonogramów w trybie codzienne wyzwanie.',
        type: 'solved_challenges', criteria: 40
    });

    await Achievement.create({
        name: 'Obieżyświat', description: 'Ukończ 365 nonogramów w trybie codzienne wyzwanie.',
        type: 'solved_challenges', criteria: 365
    });
});

// uncomment to migrate models and insert test data

// await sequelize.sync({ force: true });

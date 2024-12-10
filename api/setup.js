import {User} from "./models/User.js";
import {Achievement} from "./models/Achievement.js";
import {sequelize} from "./server.js";
import * as argon2 from "argon2";

await import ('./relations.js');

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

    await Achievement.create({
        name: 'Zbieracz punktów (I)', description: 'Zdobądź 1000 punktów.',
        type: 'total_points', criteria: 1000
    });

    await Achievement.create({
        name: 'Zbieracz punktów (II)', description: 'Zdobądź 5000 punktów.',
        type: 'total_points', criteria: 5000
    });

    await Achievement.create({
        name: 'Zbieracz punktów (III)', description: 'Zdobądź 10000 punktów.',
        type: 'total_points', criteria: 10000
    });
});

// uncomment to migrate models and insert test data

console.log("Migrating models...");
await sequelize.sync({ force: true }).then((res) => console.log("Models migrated.")).catch((err) => console.log("Error while migrating models."));

process.exit();
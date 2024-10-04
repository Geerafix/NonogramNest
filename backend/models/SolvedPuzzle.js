import {sequelize} from '../server.js';
import {DataTypes} from 'sequelize';

import {UserProfile} from './UserProfile.js';
import {Puzzle} from './Puzzle.js';
import {Score} from './Score.js';

export const SolvedPuzzle = sequelize.define('SolvedPuzzle', {
    solved_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    puzzle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    answers: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    time: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    points: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
}, {
    tableName: 'SolvedPuzzles',
    timestamps: false,
    hooks: {
        afterCreate: async (solved_puzzle, options) => {
            await UserProfile.update({
                solved_puzzles: sequelize.literal('solved_puzzles + 1'),
                total_points: sequelize.literal(`total_points + ${solved_puzzle.points}`),
                total_play_time: sequelize.literal(`total_play_time + ${solved_puzzle.time}`),
            }, {
                where: {
                    user_id: solved_puzzle.user_id
                }
            });

            const puzzle = await Puzzle.findOne({
                where: {puzzle_id: solved_puzzle.puzzle_id}
            });

            const column = `size_${puzzle.size}`;

            await Score.update({
                [column]: sequelize.literal(`${column} + ${solved_puzzle.points}`),
                classic_sum: sequelize.literal(`classic_sum + ${solved_puzzle.points}`),
            }, {
                where: {
                    user_id: solved_puzzle.user_id
                }
            });
        }
    }
});
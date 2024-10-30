import {sequelize} from '../server.js';
import {DataTypes, Op} from 'sequelize';

import {UserProfile} from './UserProfile.js';
import {Puzzle} from './Puzzle.js';
import {Score} from './Score.js';
import {Achievement} from "./Achievement.js";
import {UserAchievement} from "./UserAchievement.js";

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
            const userProfile = await UserProfile.findOne({
                where: {user_id: solved_puzzle.user_id}
            });

            userProfile.solved_puzzles += 1;
            userProfile.total_points += solved_puzzle.points;
            userProfile.total_play_time += solved_puzzle.time;

            const achieved = await Achievement.findAll();

            for (const element of achieved) {
                const type = JSON.parse(JSON.stringify(element.type));
                const criteria = element.criteria;
                if (userProfile[type] >= criteria) {
                    await UserAchievement.findOrCreate({
                        where: {
                            [Op.and]: [
                                {user_id: userProfile.user_id},
                                {achievement_id: element.achievement_id}
                            ],
                        },
                        defaults: {
                            achievement_id: element.achievement_id,
                            user_id: userProfile.user_id,
                            date_achieved: new Date()
                        }
                    });
                }
            }

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

            await userProfile.save();
        }
    }
});
import { sequelize } from '../server.js';
import { DataTypes } from 'sequelize';

import { Score } from './Score.js';

export const DailyChallenge = sequelize.define('DailyChallenge', {
    daily_id: {
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
        allowNull: false,
    },
    time: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    points: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    is_solved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    }
}, {
    tableName: 'DailyChallenges',
    timestamps: false,
    hooks: {
        afterCreate: async (solved_challenge, options) => {
            await Score.update({
            challenge_sum: sequelize.literal(`challenge_sum + ${solved_challenge.points}`),
            }, {
                where: {
                    user_id: solved_challenge.user_id
                }
            });
        }
    }
});
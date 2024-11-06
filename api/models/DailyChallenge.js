import {sequelize} from '../server.js';
import {DataTypes, Op} from 'sequelize';
import {UserProfile} from './UserProfile.js';
import {Score} from './Score.js';
import {Achievement} from "./Achievement.js";
import {UserAchievement} from "./UserAchievement.js";

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
        afterUpdate: async (solved_challenge, options) => {
            if (solved_challenge.is_solved === true) {
                const userProfile = await UserProfile.findOne({
                    where: {user_id: solved_challenge.user_id}
                });

                userProfile.solved_challenges += 1;
                userProfile.total_points += solved_challenge.points;
                userProfile.total_play_time += solved_challenge.time;

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

                await Score.update({
                    challenge_sum: sequelize.literal(`challenge_sum + ${solved_challenge.points}`),
                }, {
                    where: {
                        user_id: solved_challenge.user_id
                    }
                });

                await userProfile.save();
            }
        },
    }
});
import {server} from '../server.js';
import {Op} from 'sequelize';
import {UserProfile} from '../models/UserProfile.js';
import {UserAchievement} from '../models/UserAchievement.js';
import {Achievement} from '../models/Achievement.js';
import {Criterion} from '../models/Criterion.js';
import {asyncHandler, getPagination} from "../utils.js";

import('../dbRelations.js');

server.get('/userAchievements', asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);
    const user = req.session.user;

    const achieved = await Achievement.findAll({
        include: [{model: Criterion}]
    });

    const userProfile = await UserProfile.findOne({
        where: {user_id: user.user_id}
    });

    for (const element of achieved) {
        const type = JSON.parse(JSON.stringify(element.Criterion.type));
        const criteria = element.Criterion.criteria;
        if (userProfile[type] >= criteria) {
            await UserAchievement.findOrCreate({
                where: {achievement_id: element.achievement_id},
                defaults: {
                    achievement_id: element.achievement_id,
                    user_id: userProfile.user_id,
                    date_achieved: new Date()
                }
            });
        }
    }

    const achievements = await Achievement.findAll({
        include: [{
            model: Criterion,
            attributes: ['criteria']
        }, {
            model: UserAchievement,
            attributes: ['date_achieved'],
            where: {user_id: {[Op.not]: null}}
        }],
        attributes: ['achievement_id', 'name', 'description'],
        limit: limit,
        offset: offset,
        raw: true
    });

    res.json(achievements);
}));

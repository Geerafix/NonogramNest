import {server} from '../server.js';
import {Op} from 'sequelize';
import {UserAchievement} from '../models/UserAchievement.js';
import {Achievement} from '../models/Achievement.js';
import {asyncHandler, authHandler, getPagination} from "../utils.js";

import('../relations.js');

server.get('/user/achievements', authHandler, asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);
    const user = await req.user;

    const achievements = await Achievement.findAll({
        include: {
            model: UserAchievement,
            attributes: ['date_achieved'],
            where: {[Op.and]: [{user_id: {[Op.not]: null}}, {user_id: user.user_id}]}
        },
        order: [['name', 'ASC']],
        limit: limit,
        offset: offset,
        raw: true
    });

    res.json(achievements);
}));

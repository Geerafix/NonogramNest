import {server} from '../server.js';
import {User} from '../models/User.js';
import {Score} from '../models/Score.js';
import {asyncHandler, authHandler, getPagination} from "../utils.js";
import {UserProfile} from "../models/UserProfile.js";

import('../relations.js');

server.get('/rating/classic', authHandler, asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);
    const size = parseInt(req.query.size);

    const column = !Number.isNaN(size) ? `size_${size}` : 'classic_sum';
    const rating = await User.findAll({
        attributes: ['user_id', 'username'],
        include: {
            model: Score,
            attributes: [column]
        },
        order: [[Score, column, 'DESC']],
        limit: limit,
        offset: offset,
        raw: true
    });

    res.json(rating);
}));

server.get('/rating/challenges', authHandler, asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);

    const rating = await User.findAll({
        attributes: ['user_id', 'username'],
        include: {
            model: Score,
            attributes: ['challenge_sum'],
        },
        order: [[Score, 'challenge_sum', 'DESC']],
        limit: limit,
        offset: offset,
        raw: true
    });

    res.json(rating);
}));

server.get('/rating/user', authHandler, asyncHandler(async (req, res) => {
    const user_id = await req.query.user_id;

    const userProfile = await UserProfile.findOne({
        include: {
            model: User,
            attributes: [],
        },
        attributes: {
            include: ['User.username']
        },
        where: {
            user_id: user_id,
        },
        raw: true
    });

    res.json(userProfile);
}));
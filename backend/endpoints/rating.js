import {server} from '../server.js';
import {User} from '../models/User.js';
import {Score} from '../models/Score.js';
import {asyncHandler, getPagination} from "../utils.js";

import('../dbRelations.js');

server.get('/rating/classic', asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);
    const size = parseInt(req.query.size);

    const column = !Number.isNaN(size) ? `size_${size}` : 'classic_sum';
    const rating = await User.findAll({
        attributes: ['username'],
        include: {
            model: Score,
            attributes: [column]
        },
        order: [
            [Score, column, 'DESC']
        ],
        limit: limit,
        offset: offset,
        raw: true
    });

    res.json(rating);
}));

server.get('/rating/dailyChallenges', asyncHandler(async (req, res) => {
    const {limit, offset} = getPagination(req);

    const rating = await User.findAll({
        attributes: ['username'],
        include: {
            model: Score,
            attributes: ['challenge_sum'],
        },
        order: [
            [Score, 'challenge_sum', 'DESC']
        ],
        limit: limit,
        offset: offset,
        raw: true
    });

    res.json(rating);
}));
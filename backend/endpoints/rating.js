import { server } from '../server.js';

import { User } from '../models/User.js';
import { Score } from '../models/Score.js';
import('../dbRelations.js');

server.get('/rating/classic', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;  
    const size = req.query.size;

    try {
        const column = `size_${size}`;
        let rating = await User.findAll({
            attributes: [ 'username' ],
            include: {
                model: Score,
                attributes: size ? [ column ] : [ 'classic_sum' ]
            },
            order: [
                [ Score, size ? column : 'classic_sum', 'DESC' ]
            ],
            limit: limit,
            offset: offset,
            raw: true
        });

        res.json(rating);
    } catch (error) {
        res.json(error);
    }
});

server.get('/rating/dailyChallenges', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;  

    try {
        let rating = await User.findAll({
            attributes: [ 'username' ],
            include: {
                model: Score,
                attributes: [ 'challenge_sum' ],
            },
            order: [
                [ Score, 'challenge_sum', 'DESC' ]
            ],
            limit: limit,
            offset: offset,
            raw: true
        });

        res.json(rating);
    } catch (error) {
        res.json(error);
    }
});
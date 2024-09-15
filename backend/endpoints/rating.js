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
                attributes: size ? [ column ] : [ 'classic_sum' ],
            },
            limit: limit,
            offset: offset
        });

        rating = Array.from(JSON.parse(JSON.stringify(rating))).map((el) => ({ 
            username: Object.values(el)[0], totalPoints: Object.values(el.Score)[0]
        })).sort((a, b) => a.totalPoints > b.totalPoints ? -1 : 1);

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
            limit: limit,
            offset: offset
        });

        rating = Array.from(JSON.parse(JSON.stringify(rating))).map((el) => ({ 
            username: Object.values(el)[0], totalPoints: Object.values(el.Score)[0]
        })).sort((a, b) => a.totalPoints > b.totalPoints ? -1 : 1);

        res.json(rating);
    } catch (error) {
        res.json(error);
    }
});
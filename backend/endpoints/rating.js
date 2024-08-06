import { sequelize, server } from '../server.js';
import { Op } from 'sequelize';
import { Puzzle, SolvedPuzzle, DailyChallenge, User } from '../models/models.js';

server.get('/rating/classic', async (req, res) => {
    const size = await req.body.size;

    const rating = await SolvedPuzzle.findAll({
        include: [{ 
            model: User,
            attributes: [ 'username' ], 
        }, {
            model: Puzzle,
            attributes: [],
            where: [
                !size ? { } : { size: size }
            ]
        }],
        attributes: [
            [ sequelize.fn('SUM', sequelize.col('points')), 'totalPoints' ]
        ],
        group: [ 
            'User.user_id'
        ],
        order: [
            ['totalPoints', 'DESC']
        ]
    });

    res.json(rating);
});

server.get('/rating/dailyChallenges', async (req, res) => {

});
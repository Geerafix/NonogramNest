import { sequelize, server } from '../server.js';
import { Op } from 'sequelize';
import { Puzzle, SolvedPuzzle, DailyChallenge, User } from '../models/models.js';

server.get('/rating/classic', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;  
    const size = req.query.size;

    try {
        let rating = await SolvedPuzzle.findAll({
            include: [{ 
                model: User,
                attributes: [ 'username' ], 
            }, {
                model: Puzzle,
                attributes: [],
                where: [
                    size ? { size: size } : { }
                ],
            }],
            attributes: [
                [ sequelize.fn('COUNT', sequelize.col('Puzzle.puzzle_id')), 'puzzleCount' ],
                [ sequelize.fn('SUM', sequelize.col('points')), 'totalPoints' ]
            ],
            group: [ 
                'User.user_id',
            ],
            order: [ 
                [ 'totalPoints', 'DESC' ] 
            ],
            limit: limit,
            offset: offset
        });

        rating = Array.from(JSON.parse(JSON.stringify(rating))).map((el) => ({ 
            username: el.User.username, totalpoints: el.totalPoints, puzzleCount: parseInt(el.puzzleCount) 
        }));

        res.json(rating);
    } catch (error) {
        res.json(error);
    }
});

server.get('/rating/dailyChallenges', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;  

    let rating = await DailyChallenge.findAll({
        include: [{ 
            model: User,
            attributes: [ 'username' ], 
        }, {
            model: Puzzle,
            attributes: [],
        }],
        attributes: [
            [ sequelize.fn('COUNT', sequelize.col('Puzzle.puzzle_id')), 'puzzleCount' ],
            [ sequelize.fn('SUM', sequelize.col('points')), 'totalPoints' ]
        ],
        group: [ 
            'User.user_id',
        ],
        order: [ 
            [ 'totalPoints', 'DESC' ] 
        ],
        limit: limit,
        offset: offset
    });

    rating = Array.from(JSON.parse(JSON.stringify(rating))).map((el) => ({ 
        username: el.User.username, totalpoints: el.totalPoints, puzzleCount: parseInt(el.puzzleCount) 
    }));

    res.json(rating);
});
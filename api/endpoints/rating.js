import {server} from '../server.js';
import {asyncHandler, authHandler} from "../utils.js";
import {getRatingAll, getRatingChallenge, getRatingClassic, getRatingUser} from "../services/ratingService.js";

server.get('/rating/classic', authHandler, asyncHandler(async (req, res) => {
    const {page, limit} = req.query;
    const size = parseInt(req.query.size);

    const rating = await getRatingClassic(page, limit, size);

    res.json(rating);
}));

server.get('/rating/challenges', authHandler, asyncHandler(async (req, res) => {
    const {page, limit} = req.query;

    const rating = await getRatingChallenge(page, limit);

    res.json(rating);
}));

server.get('/rating/all', authHandler, asyncHandler(async (req, res) => {
    const {page, limit} = req.query;

    const rating = await getRatingAll(page, limit);

    res.json(rating);
}));

server.get('/rating/profile', authHandler, asyncHandler(async (req, res) => {
    const user_id = req.query.user_id;

    const profile = await getRatingUser(user_id);

    res.json(profile);
}));
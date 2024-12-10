import {server} from "../server.js";
import {asyncHandler, authHandler} from "../utils.js";
import {
    getCommunityPuzzle,
    getCommunityPuzzles,
    getUserPuzzles,
    postCreatedPuzzle
} from "../services/communityService.js";

server.get('/community/puzzles', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const {page, limit} = req.query;
    const search = req.query.search;
    const option = req.query.option;

    const puzzles = await getCommunityPuzzles(user.user_id, search, option, page, limit);

    res.json(puzzles);
}));

server.get('/community/puzzle', authHandler, asyncHandler(async (req, res) => {
    const puzzle_id = req.query.created_id;

    const communityPuzzle = await getCommunityPuzzle(puzzle_id);

    res.json(communityPuzzle);
}));

server.post('/community/created', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const clues_x = await req.body.cluesX;
    const clues_y = await req.body.cluesY;
    const size = await req.body.size;
    const excluded_tiles = await req.body.excludedTiles;
    const name = await req.body.name;

    await postCreatedPuzzle(user.user_id, clues_x, clues_y, size, excluded_tiles, name);

    res.json({msg: 'Sent puzzle'});
}));

server.get('/user/puzzles', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const {page, limit} = req.query;
    const search = req.query.search;

    const puzzles = await getUserPuzzles(user.user_id, search, page, limit);

    res.json(puzzles);
}));

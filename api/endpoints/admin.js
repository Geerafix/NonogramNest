import {server} from "../server.js";
import {asyncHandler, authHandler} from "../utils.js";
import {
    deleteAchievement,
    deleteChallenge,
    deleteClassic,
    deleteCreated,
    deleteMessage,
    deletePuzzle,
    deleteUser,
    getAchievements,
    getAdmins,
    getCreatedPuzzles,
    getMessages,
    getPuzzle,
    getPuzzles,
    getSolvedChallenge,
    getSolvedClassic,
    getUser,
    getUsers,
    postAchievement,
    publishPuzzle,
    updateAchievement,
    updateUser
} from "../services/adminService.js";

server.get('/api/admin/puzzles', authHandler, asyncHandler(async (req, res) => {
    const {page, limit} = req.query;
    const search = req.query.search;
    const option = req.query.option;

    const puzzles = await getPuzzles(page, limit, search, option);

    res.json(puzzles);
}));

server.get('/api/admin/puzzle', authHandler, asyncHandler(async (req, res) => {
    const created_id = req.query.puzzleId;

    const puzzle = await getPuzzle(created_id);

    res.json(puzzle);
}));

server.put('/api/admin/puzzle', authHandler, asyncHandler(async (req, res) => {
    const created_id = await req.body.puzzleId;
    const board = await req.body.board;

    await publishPuzzle(created_id, board);

    res.json({msg: 'Success'});
}));

server.delete('/api/admin/puzzle', authHandler, asyncHandler(async (req, res) => {
    const created_id = req.query.puzzleId;

    await deletePuzzle(created_id);

    res.json({msg: 'Success'});
}));

server.get('/api/admin/users', authHandler, asyncHandler(async (req, res) => {
    const {page, limit} = req.query;
    const search = req.query.search;
    const option = req.query.option;

    const users = await getUsers(page, limit, search, option);

    res.json(users);
}));

server.get('/api/admin/user', authHandler, asyncHandler(async (req, res) => {
    const user_id = req.query.user_id;

    const user = await getUser(user_id);

    res.json(user);
}));

server.get('/api/admin/user/classic', authHandler, asyncHandler(async (req, res) => {
    const {page, limit} = req.query;
    const user_id = req.query.userId;

    const classic = await getSolvedClassic(user_id, page, limit);

    res.json(classic);
}));

server.get('/api/admin/user/challenge', authHandler, asyncHandler(async (req, res) => {
    const {page, limit} = req.query;
    const user_id = req.query.userId;

    const challenges = await getSolvedChallenge(user_id, page, limit);

    res.json(challenges);
}));

server.get('/api/admin/user/created', authHandler, asyncHandler(async (req, res) => {
    const {page, limit} = req.query;
    const user_id = req.query.userId;

    const created = await getCreatedPuzzles(user_id, page, limit)

    res.json(created);
}));

server.delete('/api/admin/user/classic', authHandler, asyncHandler(async (req, res) => {
    const {userId, contentId} = req.query;

    await deleteClassic(userId, contentId);

    res.json({msg: 'Success'});
}));

server.delete('/api/admin/user/challenge', authHandler, asyncHandler(async (req, res) => {
    const {userId, contentId} = req.query;

    await deleteChallenge(userId, contentId);

    res.json({msg: 'Success'});
}));

server.delete('/api/admin/user/created', authHandler, asyncHandler(async (req, res) => {
    const {userId, contentId} = req.query;

    await deleteCreated(userId, contentId);

    res.json({msg: 'Success'});
}));

server.delete('/api/admin/deleteUser', authHandler, asyncHandler(async (req, res) => {
    const user_id = req.query.userId;

    await deleteUser(user_id);

    res.json({msg: 'Success'});
}));

server.put('/api/admin/user', authHandler, asyncHandler(async (req, res) => {
    const user = await req.body.user;

    const updatedUser = await updateUser(user);

    res.json(updatedUser);
}));

server.get('/api/admin/admins', authHandler, asyncHandler(async (req, res) => {
    const {page, limit} = req.query;
    const search = req.query.search;
    const option = req.query.option;
    const user = await req.user;

    const users = await getAdmins(user.user_id, page, limit, search, option);

    res.json(users);
}));

server.get('/api/admin/achievements', authHandler, asyncHandler(async (req, res) => {
    const {page, limit} = req.query;

    const achievements = await getAchievements(page, limit);

    res.json(achievements);
}));

server.post('/api/admin/achievement', authHandler, asyncHandler(async (req, res) => {
    const achievement = await req.body.achievement;

    await postAchievement(achievement);

    res.json({msg: 'Success'});
}));

server.put('/api/admin/achievement', authHandler, asyncHandler(async (req, res) => {
    const achievement = await req.body.achievement;

    await updateAchievement(achievement);

    res.json({msg: 'Success'});
}));

server.delete('/api/admin/achievement', authHandler, asyncHandler(async (req, res) => {
    const achievement_id = req.query.achievement_id;

    await deleteAchievement(achievement_id);

    res.json({msg: 'Success'});
}));

server.get('/api/admin/messages', authHandler, asyncHandler(async (req, res) => {
    const {page, limit} = req.query;

    const messages = await getMessages(page, limit);

    res.json(messages);
}));

server.delete('/api/admin/message', authHandler, asyncHandler(async (req, res) => {
    const message_id = req.query.messageId;

    await deleteMessage(message_id);

    res.json({msg: 'Success'});
}));


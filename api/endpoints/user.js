import {server} from '../server.js';
import {asyncHandler, authHandler} from "../utils.js";
import {
    getAchievedCount,
    getAchievementsCount,
    getProfile,
    getUserAchievements,
    postMessage,
    updateBio,
    updateEmail,
    updatePassword,
    updatePfp,
    updateUsername
} from "../services/userService.js";

server.get('/user/achievements', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const {page, limit} = req.query;

    const achievements = await getUserAchievements(user.user_id, page, limit);

    res.json(achievements);
}));

server.get('/user/achievements/count', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;

    const count = await getAchievementsCount(user.user_id);

    res.json(count);
}));

server.get('/user/achieved', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;

    const count = await getAchievedCount(user.user_id);

    res.json(count);
}));

server.get('/profile', authHandler, async (req, res) => {
    const user = await req.user;

    const userProfile = await getProfile(user.user_id);

    res.json(userProfile);
});

server.put('/profile/username', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const username = await req.body.username;

    await updateUsername(user.user_id, username);

    res.json({msg: 'Successfully updated username'});
}));

server.put('/profile/pfp', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const pfp = await req.body.pfp;

    await updatePfp(user.user_id, pfp);

    res.json({msg: 'Successfully updated profile picture'});
}));

server.put('/profile/bio', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const bio = await req.body.bio;

    await updateBio(user.user_id, bio);

    res.json({msg: 'Successfully updated bio'});
}));

server.put('/profile/password', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const currentPassword = await req.body.currentPassword;
    const newPassword = await req.body.newPassword;

    await updatePassword(user.user_id, currentPassword, newPassword);

    res.json({msg: 'Successfully updated password'});
}));

server.put('/profile/email', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const email = await req.body.email;

    await updateEmail(user.user_id, email);

    res.json({msg: 'Successfully updated email'});
}));

server.post('/profile/message', authHandler, asyncHandler(async (req, res) => {
    const user = await req.user;
    const title = await req.body.title;
    const content = await req.body.content;

    await postMessage(user.user_id, title, content);

    res.json({msg: 'Successfully sent message'});
}));

server.post('/logout', authHandler, asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.status(200).send({msg: 'Logged out'});
}));

server.post('/role', authHandler, asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) res.json({role: ''})

    res.json({role: user.role});
}));


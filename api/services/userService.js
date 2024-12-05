import {getPagination} from "../utils.js";
import {Achievement} from "../models/Achievement.js";
import {UserAchievement} from "../models/UserAchievement.js";
import {Op} from "sequelize";
import {UserProfile} from "../models/UserProfile.js";
import {User} from "../models/User.js";
import {Message} from "../models/Message.js";
import * as argon2 from "argon2";

export const getUserAchievements = async (user_id, l, o) => {
    const {limit, offset} = getPagination(l, o);

    return await Achievement.findAll({
        include: {
            model: UserAchievement,
            attributes: [],
            where: {[Op.or]: [{user_id: null}, {user_id: user_id}]},
            required: false,
            duplicating: false
        },
        attributes: {
            include: ['UserAchievements.date_achieved'],
            exclude: ['type', 'criteria']
        },
        order: [[{model: UserAchievement}, 'date_achieved', 'DESC NULLS LAST']],
        limit: limit,
        offset: offset,
        raw: true
    });
}

export const getAchievementsCount = async (user_id) => {
    return await Achievement.count({
        include: {model: UserAchievement, where: {user_id: user_id}}
    });
}

export const getAchievedCount = async (user_id) => {
    const count = await Achievement.count({
        include: {model: UserAchievement, where: {user_id: user_id}}
    });
    const all = await Achievement.count();

    const percent = ((count / all) * 100).toFixed(0).concat('%');

    return (count + '/' + all + ` (${percent})`);
}

export const getProfile = async (user_id) => {
    return await UserProfile.findOne({
        include: {
            model: User,
            attributes: [],
        },
        attributes: {include: ['User.username']},
        where: {user_id: user_id},
        raw: true
    });
}

export const updateUsername = async (user_id, username) => {
    await User.update({
        username: username
    }, {
        where: {user_id: user_id}
    });
}

export const updatePfp = async (user_id, pfp) => {
    await UserProfile.update({
        pfp: pfp
    }, {
        where: {user_id: user_id}
    });
}

export const updateBio = async (user_id, bio) => {
    await UserProfile.update({
        bio: bio
    }, {
        where: {user_id: user_id}
    });
}

export const updatePassword = async (user_id, currentPassword, newPassword) => {
    const userData = await User.findOne({
        where: {user_id: user_id}
    });

    if (userData && await argon2.verify(userData.password, currentPassword)) {
        const hash = await argon2.hash(newPassword);
        await User.update({
            password: hash
        }, {
            where: {user_id: user_id}
        });
    }
}

export const updateEmail = async (user_id, email) => {
    await User.update({
        email: email
    }, {
        where: {user_id: user_id}
    });
}

export const postMessage = async (user_id, title, content) => {
    await Message.create({
        user_id: user_id,
        title: title,
        content: content
    });
}
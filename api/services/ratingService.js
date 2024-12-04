import {sequelize} from "../server.js";
import {Score} from "../models/Score.js";
import {User} from "../models/User.js";
import {UserProfile} from "../models/UserProfile.js";
import {getPagination} from "../utils.js";

export const getRatingClassic = async (l, o, size) => {
    const {limit, offset} = getPagination(l, o);

    const column = (Number.isNaN(size) || typeof size === 'undefined') ? 'classic_sum' : `size_${size}`;

    return await User.findAll({
        include: {
            model: Score,
            attributes: [],
            duplicating: false
        },
        where: {role: 'user'},
        attributes: ['user_id', 'username', `Score.${column}`,
            [sequelize.literal(`(RANK() OVER (ORDER BY ${column} DESC))`), 'rank']
        ],
        order: [[Score, column, 'DESC']],
        limit: limit,
        offset: offset,
        raw: true
    });
}

export const getRatingChallenge = async (l, o) => {
    const {limit, offset} = getPagination(l, o);

    return await User.findAll({
        include: {
            model: Score,
            attributes: [],
            duplicating: false
        },
        where: {role: 'user'},
        attributes: ['user_id', 'username', 'Score.challenge_sum',
            [sequelize.literal('(RANK() OVER (ORDER BY challenge_sum DESC))'), 'rank']
        ],
        order: [[Score, 'challenge_sum', 'DESC']],
        limit: limit,
        offset: offset,
        raw: true
    });
}

export const getRatingAll = async (l, o) => {
    const {limit, offset} = getPagination(l, o);

    return await User.findAll({
        include: {
            model: UserProfile,
            attributes: [],
            duplicating: false
        },
        where: {role: 'user'},
        attributes: ['user_id', 'username', 'UserProfile.total_points',
            [sequelize.literal('(RANK() OVER (ORDER BY total_points DESC))'), 'rank']
        ],
        order: [[UserProfile, 'total_points', 'DESC']],
        limit: limit,
        offset: offset,
        raw: true
    });
}

export const getRatingUser = async (user_id) => {
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
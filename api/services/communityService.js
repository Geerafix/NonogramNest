import {CreatedPuzzle} from "../models/CreatedPuzzle.js";
import {Puzzle} from "../models/Puzzle.js";
import {User} from "../models/User.js";
import {Op} from "sequelize";
import {getPagination} from "../utils.js";

export const getCommunityPuzzles = async (user_id, s, option, l, o) => {
    const {limit, offset} = getPagination(l, o);
    const search = `%${s}%` || '%%';

    return await CreatedPuzzle.findAll({
        include: [{
            model: Puzzle,
            attributes: []
        }, {
            model: User,
            attributes: [],
            where: {
                username: {[Op.iLike]: option === 'creator' ? search : '%%'},
                user_id: {[Op.ne]: user_id}
            }
        }],
        where: {
            name: {[Op.iLike]: option === 'name' ? search : '%%'},
            is_public: true
        },
        attributes: ['created_id', 'name', 'Puzzle.size', 'User.username'],
        limit: limit,
        offset: offset,
        order: [['created_id', 'ASC']],
        raw: true
    });
}

export const getCommunityPuzzle = async (puzzle_id) => {
    return await Puzzle.findOne({
        include: [{
            model: CreatedPuzzle,
            attributes: [],
            where: {
                created_id: puzzle_id,
                is_public: true
            }
        }],
    });
}

export const postCreatedPuzzle = async (user_id, clues_x, clues_y, size, excluded_tiles, name) => {
    const puzzle = await Puzzle.create({
        clues_x: clues_x,
        clues_y: clues_y,
        size: size,
        excluded_tiles: excluded_tiles
    });

    await CreatedPuzzle.create({
        user_id: user_id,
        puzzle_id: puzzle.puzzle_id,
        name: name,
    });
}

export const getUserPuzzles = async (user_id, s, l, o) => {
    const {limit, offset} = getPagination(l, o);
    const search = `%${s}%` || '%%';

    return await CreatedPuzzle.findAll({
        include: [{
            model: Puzzle,
            attributes: []
        }, {
            model: User,
            attributes: [],
            where: {user_id: user_id}
        }],
        where: {
            name: {[Op.iLike]: search},
            is_public: true
        },
        attributes: ['created_id', 'name', 'Puzzle.size', 'User.username'],
        limit: limit,
        offset: offset,
        order: [['created_id', 'ASC']],
        raw: true
    });
}
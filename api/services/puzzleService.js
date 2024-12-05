import {Puzzle} from "../models/Puzzle.js";
import {SolvedPuzzle} from "../models/SolvedPuzzle.js";

export const postPuzzle = async (cluesX, cluesY, size) => {
    return await Puzzle.create({
        clues_x: cluesX,
        clues_y: cluesY,
        size: size
    });
}

export const postSolved = async (user_id, puzzle_id, time, points) => {
    return await SolvedPuzzle.create({
        puzzle_id: puzzle_id,
        user_id: user_id,
        time: time,
        points: points
    });
}
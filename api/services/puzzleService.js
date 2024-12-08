import {Puzzle} from "../models/Puzzle.js";
import {SolvedPuzzle} from "../models/SolvedPuzzle.js";
import jwt from "jsonwebtoken";

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

export const saveNonogram = (nonogram) => {
    return jwt.sign(
        JSON.stringify(nonogram),
        process.env.JWT_SECRET
    );
}

export const loadNonogram = (nonogram) => {
    let result;

    jwt.verify(nonogram, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return;
        }

        result = decoded
    });

    return result ? result : null;
}
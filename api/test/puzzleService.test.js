import {expect, test, describe} from "vitest"
import {postPuzzle, postSolved} from "../services/puzzleService.js";
await import('../relations.js');

describe('puzzles', () => {
    test('should return error (post puzzles)', async () => {
        try {
            await postPuzzle();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    test('should return object with required properties (post puzzles)', async () => {
        const mock = await postPuzzle('[1, 2, 3]', '[1, 2, 3]', 5);

        expect(mock).toHaveProperty('puzzle_id');
        expect(mock).toHaveProperty('clues_x');
        expect(mock).toHaveProperty('clues_y');
        expect(mock).toHaveProperty('size');
        expect(mock).toHaveProperty('excluded_tiles');

        expect(mock.excluded_tiles).toBeNull();
    });

    test('should return error (post solved puzzle)', async () => {
        try {
            await postSolved();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    test('should return object with required properties (post solved puzzles)', async () => {
        const mock = await postSolved(2, 1, 100, 20);

        expect(mock).toHaveProperty('user_id');
        expect(mock).toHaveProperty('puzzle_id');
        expect(mock).toHaveProperty('time');
        expect(mock).toHaveProperty('points');
    });
});

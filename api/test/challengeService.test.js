import {describe, expect, test} from "vitest";
await import('../relations.js');
import {
    getDailies,
    getDailyChallenge,
    getStreak,
    postDailyChallenge,
    updateDailyChallenge
} from "../services/challengeService.js";
import {postPuzzle} from "../services/puzzleService.js";

describe('challenge', () => {
    test('should return daily challenge with required properties', async () => {
        const mock = await getDailyChallenge(1);

        expect(Object.keys(mock).length).toBeGreaterThan(0);

        expect(mock).toHaveProperty('daily_id');
        expect(mock).toHaveProperty('user_id');
        expect(mock).toHaveProperty('puzzle_id');
        expect(mock).toHaveProperty('answers');
        expect(mock).toHaveProperty('time');
        expect(mock).toHaveProperty('points');
        expect(mock).toHaveProperty('is_solved');
        expect(mock).toHaveProperty('date');
    });

    test('should return array of days of month with solved dailies', async () => {
        const month = 11;
        const year = 2024;

        const mock = await getDailies(1, month, year);

        expect(mock).toBeDefined();
        expect(Array.isArray(mock)).toBe(true);
    });

    test('should return new daily challenge', async () => {
        const puzzle = await postPuzzle('[]', '[]', 10)
        const mock = await postDailyChallenge(1, puzzle.puzzle_id, '[]', 0, 1000);

        expect(Object.keys(mock).length).toBeGreaterThan(0);

        expect(mock).toHaveProperty('daily_id');
        expect(mock).toHaveProperty('user_id');
        expect(mock).toHaveProperty('puzzle_id');
        expect(mock).toHaveProperty('answers');
        expect(mock).toHaveProperty('time');
        expect(mock).toHaveProperty('points');
        expect(mock).toHaveProperty('is_solved');
        expect(mock).toHaveProperty('date');
    });

    test('should return updated daily challenge', async () => {
        const mock = await updateDailyChallenge(1, '[1, 2, 3, 4, 5]', 100, 1000, 100, true);

        expect(Object.keys(mock).length).toBeGreaterThan(0);

        expect(mock).toHaveProperty('daily_id');
        expect(mock).toHaveProperty('user_id');
        expect(mock).toHaveProperty('puzzle_id');
        expect(mock).toHaveProperty('answers');
        expect(mock).toHaveProperty('time');
        expect(mock).toHaveProperty('points');
        expect(mock).toHaveProperty('is_solved');
        expect(mock).toHaveProperty('date');
    });

    test('should return error ', async () => {
        try {
            await updateDailyChallenge();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    test('should return null daily challenge', async () => {
        const mock = await getDailyChallenge(2147483647);

        expect(mock).toBeNull();
    });

    test('should return daily challenge streak with required properties', async () => {
        const mock = await getStreak(1);

        expect(mock).toBeDefined();
        expect(typeof mock).toBe('number');
    });
});
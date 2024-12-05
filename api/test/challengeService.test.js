import {describe, expect, test} from "vitest";
await import('../relations.js');
import {getDailyChallenge, getStreak} from "../services/challengeService.js";

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
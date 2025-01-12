import {describe, expect, test} from "vitest"
import {getAchievedCount, getAchievementsCount, getProfile, getUserAchievements} from "../services/userService.js";

await import('../relations.js');

describe('user achievements', () => {
    test('should return whole list of user achievements', async () => {
        const mock = await getUserAchievements(1);

        expect(Array.isArray(mock)).toBe(true);
        expect(mock.length).toBeGreaterThan(0);
    });

    test('should handle zero elements in achievements list', async () => {
        const page = 1, limit = 0;

        const mock = await getUserAchievements(1, page, limit);

        expect(mock).toEqual([]);
    });

    test('should return list of object with user achievements each with required property', async () => {
        const page = 1, limit = 10;

        const mock = await getUserAchievements(1, page, limit);

        for (const el of mock) {
            expect(el).toHaveProperty('achievement_id');
            expect(el).toHaveProperty('name');
            expect(el).toHaveProperty('description');
            expect(el).toHaveProperty('date_achieved');
        }
    });

    test('should paginate achievements list properly', async () => {
        const page = 1, limit = 5;

        const mock = await getUserAchievements(1, page, limit);

        expect(mock).toHaveLength(limit);
    });

    test('should return required data with required type of achievements count', async () => {
        const mock = await getAchievementsCount(1);

        expect(mock).toBeDefined();
        expect(typeof mock).toBe('number');
    });

    test('should return defined data with required type of achieved stat', async () => {
        const mock = await getAchievedCount(1);

        expect(mock).toBeDefined();
        expect(typeof mock).toBe('string');
    });
});

describe('user profile', () => {
    test('should return user profile', async () => {
        const mock = await getProfile(1);

        expect(mock).toBeDefined();
    });

    test('should return user profile with required properties', async () => {
        const mock = await getProfile(2);

        expect(Object.keys(mock).length).toBeGreaterThan(0);

        expect(mock).toHaveProperty('user_profile_id');
        expect(mock).toHaveProperty('user_id');
        expect(mock).toHaveProperty('pfp');
        expect(mock).toHaveProperty('bio');
        expect(mock).toHaveProperty('solved_puzzles');
        expect(mock).toHaveProperty('solved_challenges');
        expect(mock).toHaveProperty('total_points');
        expect(mock).toHaveProperty('total_play_time');
        expect(mock).toHaveProperty('register_date');
    });

    test('should return null user profile', async () => {
        const mock = await getProfile(2147483647);

        expect(mock).toBeNull();
    });
});
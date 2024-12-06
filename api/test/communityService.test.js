import {expect, test, describe} from "vitest"
import {getCommunityPuzzles, getUserPuzzles} from "../services/communityService.js";
await import('../relations.js');

describe('community puzzles', () => {
    test('should return empty users puzzle list', async () => {
        // założenie: brak podanych parametrów
        const mock = await getCommunityPuzzles();

        expect(mock.length).toBeGreaterThanOrEqual(0);
    });

    test('should return users puzzle list', async () => {
        // założenie: w bazie istnieją x > 0 plansz użytkownika o id 1, podajemy id innego uż.
        const mock = await getCommunityPuzzles(3);

        expect(mock.length).toBeGreaterThan(0);
    });

    test('should return users puzzle objects with required properties', async () => {
        const mock = await getCommunityPuzzles(1);

        for (const el of mock) {
            expect(el).toHaveProperty('created_id');
            expect(el).toHaveProperty('name');
            expect(el).toHaveProperty('size');
            expect(el).toHaveProperty('username');
        }
    });

    test('should return searched objects with required properties', async () => {
        // założenie: w bazie istnieje 1 mapa o wybranej nazwie
        const mock = await getCommunityPuzzles(3, 'Test', 'name');

        for (const el of mock) {
            expect(el).toHaveProperty('created_id');
            expect(el).toHaveProperty('name');
            expect(el).toHaveProperty('size');
            expect(el).toHaveProperty('username');
        }
    });

    test('should return searched objects with required properties with option', async () => {
        // założenie: w bazie nie istnieją plansze wybranego użytkownika
        const mock = await getCommunityPuzzles(3, 'Test', 'creator');

        expect(mock).toHaveLength(0);
    });

    test('should paginate data properly (community puzzles)', async () => {
        const page = 1;
        const limit = 1;

        const mock = await getCommunityPuzzles(3, undefined, undefined, page, limit);

        expect(mock).toHaveLength(1);
    });

    test('should return an empty array when requesting a page beyond available data', async () => {
        const page = 2147483647;
        const limit = 10;

        const mock = await getCommunityPuzzles(3, undefined, undefined, page, limit);

        expect(mock).toEqual([]);
    });
});

describe('user puzzles', () => {
    test('should paginate data properly', async () => {
        const page = 1;
        const limit = 2;

        const mock = await getUserPuzzles(1, undefined, page, limit);

        expect(mock).toHaveLength(2);
    });

    test('should return searched objects with required properties', async () => {
        // założenie: w bazie istnieje 1 mapa o wybranej nazwie
        const mock = await getUserPuzzles(1);

        for (const el of mock) {
            expect(el).toHaveProperty('created_id');
            expect(el).toHaveProperty('name');
            expect(el).toHaveProperty('size');
            expect(el).toHaveProperty('username');
        }
    });

    test('should return empty object list', async () => {
        // założenie: id 0 nie istnieje
        const mock = await getUserPuzzles(2147483647);

        expect(mock).toEqual([]);
    });

    test('should return an empty array when requesting a page beyond available data', async () => {
        const page = 2147483647;
        const limit = 10;

        const mock = await getUserPuzzles(1, undefined, page, limit);

        expect(mock).toEqual([]);
    });
});

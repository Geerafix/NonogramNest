import {describe, expect, test} from "vitest"
import {getCommunityPuzzles, getUserPuzzles, postCreatedPuzzle} from "../services/communityService.js";
import {deleteCreated, publishPuzzle} from "../services/adminService.js";

await import('../relations.js');

describe('community puzzles', () => {
    test('should return empty users puzzle list', async () => {
        const mock = await getCommunityPuzzles();

        expect(mock.length).toBeGreaterThanOrEqual(0);
    });

    test('should return users puzzle list', async () => {
        const {created} = await postCreatedPuzzle(2, '[]', '[]', 5, '[]', 's');

        await publishPuzzle(created.created_id, '[]');

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
        const mock = await getCommunityPuzzles(3, 'Test', 'name');

        for (const el of mock) {
            expect(el).toHaveProperty('created_id');
            expect(el).toHaveProperty('name');
            expect(el).toHaveProperty('size');
            expect(el).toHaveProperty('username');
        }
    });

    test('should return searched objects with required properties with option', async () => {
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
        const {created} = await postCreatedPuzzle(2, '[]', '[]', 5, '[]', 's');

        await postCreatedPuzzle(2, '[]', '[]', 5, '[]', 's');

        await publishPuzzle(created.created_id, '[]');

        const page = 1;
        const limit = 1;

        const mock = await getUserPuzzles(2, undefined, page, limit);

        await deleteCreated(2, created.created_id);

        expect(mock).toHaveLength(1);
    });

    test('should return searched objects with required properties', async () => {
        const mock = await getUserPuzzles(1);

        for (const el of mock) {
            expect(el).toHaveProperty('created_id');
            expect(el).toHaveProperty('name');
            expect(el).toHaveProperty('size');
            expect(el).toHaveProperty('username');
        }
    });

    test('should return empty object list', async () => {
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
import {describe, expect, test} from "vitest";
await import('../relations.js');
import {getPuzzles, getPuzzle, getUsers, getUser, publishPuzzle, deletePuzzle} from "../services/adminService.js";
import {postCreatedPuzzle} from "../services/communityService.js";

describe('admin - puzzles', () => {
    test('should return pending puzzles each with required properties', async () => {
        const mock = await getPuzzles();

        for (const el of mock) {
            expect(Object.keys(mock).length).toBeGreaterThan(0);

            expect(el).toHaveProperty('created_id');
            expect(el).toHaveProperty('name');
            expect(el).toHaveProperty('size');
            expect(el).toHaveProperty('username');
            expect(el).toHaveProperty('excluded_tiles');
        }
    });

    test('should paginate data properly', async () => {
        const page = 1;
        const limit = 1;

        const mock = await getPuzzles(page, limit);

        expect(mock).toHaveLength(1);
    });

    test('should return empty list if page is out of range', async () => {
        const page = 2147483647;
        const limit = 10;

        const mock = await getPuzzles(page, limit);

        expect(mock).toHaveLength(0);
    });

    test('should return error if page is out of range with limit equal to 0', async () => {
        const page = 2147483647;
        const limit = 0;

        try {
            await getPuzzles(page, limit);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    test('should return searched pending puzzles by name', async () => {
        const mock = await getPuzzles(undefined, undefined, 's', 'name');

        expect(mock.length > 0).toBe(true);
    });

    test('should not return searched pending puzzles by name', async () => {
        const mock = await getPuzzles(undefined, undefined, '-=+_;:', 'name');

        expect(mock.length === 0).toBe(true);
    });

    test('should return searched pending puzzles by creator', async () => {
        const mock = await getPuzzles(undefined, undefined, 'adam', 'creator');

        expect(mock.length > 0).toBe(true);
    });

    test('should not return searched pending puzzles', async () => {
        const mock = await getPuzzles(undefined, undefined, '-=+_;:', 'creator');

        expect(mock.length === 0).toBe(true);
    });

    test('should return single pending puzzle with required properties', async () => {
        const {created} = await postCreatedPuzzle(1, '[]', '[]', 5, '[]', 'name');

        const mock = await getPuzzle(created.created_id);

        expect(mock).toBeDefined();

        expect(Object.keys(mock).length).toBeGreaterThan(0);

        expect(mock).toHaveProperty('created_id');
        expect(mock).toHaveProperty('user_id');
        expect(mock).toHaveProperty('puzzle_id');
        expect(mock).toHaveProperty('name');
        expect(mock).toHaveProperty('is_public');
        expect(mock).toHaveProperty('date');
        expect(mock).toHaveProperty('excluded_tiles');
    });

    test('should return error if pending puzzle id is not provided', async () => {
        try {
            await getPuzzle();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    test('should return undefined if published', async () => {
        const {created} = await postCreatedPuzzle(1, '[]', '[]', 5, '[]', 'name');

        const mock = await publishPuzzle(created.created_id, '[]');

        expect(mock).toBeUndefined();
    });

    test('should return error if published puzzle id is not existent', async () => {
        try {
            await publishPuzzle(2147483647, '[]');
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    test('should return error if published puzzle board is undefined', async () => {
        try {
            await publishPuzzle(1, undefined);
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    test('should return error if puzzle id is not existent', async () => {
        try {
            await deletePuzzle(2147483647);
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    test('should return 1 if published puzzle is deleted', async () => {
        const {created} = await postCreatedPuzzle(1, '[]', '[]', 5, '[]', 'name');

        const mock = await deletePuzzle(created.created_id);

        expect(mock).toEqual(1);
    });
});

describe('admin - users', () => {
    test('should return users each with required properties', async () => {
        const mock = await getUsers();

        expect(Array.isArray(mock)).toBe(true);

        for (const el of mock) {
            expect(Object.keys(mock).length).toBeGreaterThan(0);

            expect(el).toHaveProperty('user_id');
            expect(el).toHaveProperty('email');
            expect(el).toHaveProperty('username');
            expect(el).toHaveProperty('role');
        }
    });

    test('should paginate data with users properly', async () => {
        const page = 1;
        const limit = 5;

        const mock = await getUsers(page, limit);

        expect(mock.length).toBeLessThanOrEqual(limit);
    });

    test('should return single user object with required properties', async () => {
        const mock = await getUser(1);

        expect(mock).toBeDefined();

        expect(Object.keys(mock).length).toBeGreaterThan(0);

        expect(mock).toHaveProperty('user_id');
        expect(mock).toHaveProperty('email');
        expect(mock).toHaveProperty('username');
        expect(mock).toHaveProperty('role');
    });
});
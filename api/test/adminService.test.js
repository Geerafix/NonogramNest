import {describe, expect, test} from "vitest";
await import('../relations.js');
import {
    getPuzzles,
    getPuzzle,
    getUsers,
    getUser,
    publishPuzzle,
    deletePuzzle,
    getSolvedClassic,
    getSolvedChallenge,
    getCreatedPuzzles,
    getAchievements,
    getMessages,
    deleteClassic,
    deleteCreated,
    deleteChallenge,
    deleteUser,
    deleteMessage,
    deleteAchievement, postAchievement, updateAchievement, updateUser
} from "../services/adminService.js";
import {postCreatedPuzzle} from "../services/communityService.js";
import * as argon2 from "argon2";
import {postMessage} from "../services/userService.js";
import {postDailyChallenge} from "../services/challengeService.js";
import {postPuzzle, postSolved} from "../services/puzzleService.js";

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

        expect(mock.length).toBeGreaterThanOrEqual(0);
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
        const id1 = await postCreatedPuzzle(2, '[]', '[]', 5, '[]', 's');
        const id2 = await postCreatedPuzzle(2, '[]', '[]', 5, '[]', 's');

        await postCreatedPuzzle(2, '[]', '[]', 5, '[]', 's');
        await postCreatedPuzzle(2, '[]', '[]', 5, '[]', 's');

        await publishPuzzle(id1.created.created_id, '[]');
        await publishPuzzle(id2.created.created_id, '[]');

        const mock = await getPuzzles(undefined, undefined, 's', 'name');

        expect(mock.length > 0).toBe(true);
    });

    test('should not return searched pending puzzles by name', async () => {
        const mock = await getPuzzles(undefined, undefined, '-=+_;:', 'name');

        expect(mock.length === 0).toBe(true);
    });

    test('should return searched pending puzzles by creator', async () => {
        const {created} = await postCreatedPuzzle(2, '[]', '[]', 5, '[]', 's');

        await publishPuzzle(created.created_id, '[]');

        const mock = await getPuzzles(undefined, undefined, 'm', 'creator');

        expect(mock.length > 0).toBe(true);
    });

    test('should not return searched pending puzzles', async () => {
        const mock = await getPuzzles(undefined, undefined, '-=+_;:', 'creator');

        expect(mock.length === 0).toBe(true);
    });

    test('should return single pending puzzle with required properties', async () => {
        const {created} = await postCreatedPuzzle(2, '[]', '[]', 5, '[]', 'name');

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
        const {created} = await postCreatedPuzzle(2, '[]', '[]', 5, '[]', 'name');

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
        const {created} = await postCreatedPuzzle(2, '[]', '[]', 5, '[]', 'name');

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
        const mock = await getUser(2);

        expect(mock).toBeDefined();

        expect(Object.keys(mock).length).toBeGreaterThan(0);

        expect(mock).toHaveProperty('user_id');
        expect(mock).toHaveProperty('email');
        expect(mock).toHaveProperty('username');
        expect(mock).toHaveProperty('role');
    });

    test('should return user solved classic puzzles with required properties', async () => {
        const mock = await getSolvedClassic(1);

        expect(mock).toBeDefined();

        for (const el of mock) {
            expect(Object.keys(mock).length).toBeGreaterThan(0);

            expect(el).toHaveProperty('solved_id');
            expect(el).toHaveProperty('points');
            expect(el).toHaveProperty('time');
        }
    });

    test('should return user solved challenges with required properties', async () => {
        const mock = await getSolvedChallenge(1);

        expect(mock).toBeDefined();

        expect(mock.length).toBeGreaterThanOrEqual(0);

        for (const el of mock) {
            expect(Object.keys(mock).length).toBeGreaterThan(0);

            expect(el).toHaveProperty('daily_id');
            expect(el).toHaveProperty('points');
            expect(el).toHaveProperty('time');
            expect(el).toHaveProperty('date');
        }
    });

    test('should return user created puzzles with required properties', async () => {
        const mock = await getCreatedPuzzles(1);

        expect(mock).toBeDefined();

        expect(mock.length).toBeGreaterThanOrEqual(0);

        for (const el of mock) {
            expect(Object.keys(mock).length).toBeGreaterThan(0);

            expect(el).toHaveProperty('created_id');
            expect(el).toHaveProperty('name');
            expect(el).toHaveProperty('size');
            expect(el).toHaveProperty('username');
            expect(el).toHaveProperty('date');
        }
    });

    test('should return achievements with required properties', async () => {
        const mock = await getAchievements();

        expect(mock).toBeDefined();

        expect(mock.length).toBeGreaterThanOrEqual(0);

        for (const el of mock) {
            expect(Object.keys(mock).length).toBeGreaterThan(0);

            expect(el).toHaveProperty('achievement_id');
            expect(el).toHaveProperty('name');
            expect(el).toHaveProperty('description');
            expect(el).toHaveProperty('type');
            expect(el).toHaveProperty('criteria');
        }
    });

    test('should return messages with required properties', async () => {
        const mock = await getMessages();

        expect(mock).toBeDefined();

        expect(mock.length).toBeGreaterThanOrEqual(0);

        for (const el of mock) {
            expect(Object.keys(mock).length).toBeGreaterThan(0);

            expect(el).toHaveProperty('message_id');
            expect(el).toHaveProperty('title');
            expect(el).toHaveProperty('content');
            expect(el).toHaveProperty('date');
            expect(el).toHaveProperty('username');
        }
    });

    test('should return 0 if none of user classic content was deleted', async () => {
        const mock = await deleteClassic(2147483647, 1);

        expect(mock).toEqual(0);
    });

    test('should return 0 if none of user challenge content was deleted', async () => {
        const mock = await deleteChallenge(2147483647, 1);

        expect(mock).toEqual(0);
    });

    test('should return 0 if none of user created content was deleted', async () => {
        const mock = await deleteCreated(2147483647, 1);

        expect(mock).toEqual(0);
    });

    test('should return 1 if user classic content was deleted', async () => {
        const puzzle = await postPuzzle('[]', '[]', 5);

        const solved = await postSolved(2, puzzle.puzzle_id, 100, 100);

        const mock = await deleteClassic(2, solved.solved_id);

        expect(mock).toEqual(1);
    });

    test('should return 1 if user challenge content was deleted', async () => {
        const puzzle = await postPuzzle('[]', '[]', 5);

        const challenge = await postDailyChallenge(2, puzzle.puzzle_id, '[]', 100, 100);

        const mock = await deleteChallenge(2, challenge.daily_id);

        expect(mock).toEqual(1);
    });

    test('should return 1 if user created content was deleted', async () => {
        const {created} = await postCreatedPuzzle(2, '[]', '[]', 5, '[]', 's');

        const mock = await deleteCreated(2, created.created_id);

        expect(mock).toEqual(1);
    });

    test('should return 0 if user was not deleted', async () => {
        const mock = await deleteUser(2147483647);

        expect(mock).toEqual(0);
    });

    test('should return 0 if achievement was not deleted', async () => {
        const mock = await deleteAchievement(2147483647);

        expect(mock).toEqual(0);
    });

    test('should return 0 if message was not deleted', async () => {
        const mock = await deleteMessage(2147483647);

        expect(mock).toEqual(0);
    });

    test('should return 1 if user was deleted (must provide existing user ID)', async () => {
        // UWAGA! ID użytkownik musi istnieć!
        const mock = await deleteUser(1);

        expect(mock).toEqual(1);
    });

    test('should return 1 if achievement was deleted', async () => {
        const achievement = {
            name: 'Test achievement',
            description: 'Test achievement description',
            type: 'solved_challenges',
            criteria: 1
        };

        const created = await postAchievement(achievement);

        const mock = await deleteAchievement(created.achievement_id);

        expect(mock).toEqual(1);
    });

    test('should return 1 if message was deleted', async () => {
        const message = await postMessage(2, 'title', 'content');

        const mock = await deleteMessage(message.message_id);

        expect(mock).toEqual(1);
    });

    test('should create a new achievement with success', async () => {
        const achievement = {
            name: 'Test achievement',
            description: 'Test achievement description',
            type: 'solved_challenges',
            criteria: 1
        };

        const mock = await postAchievement(achievement);

        expect(mock).toBeDefined();

        expect(Object.keys(mock).length).toBeGreaterThan(0);

        await deleteAchievement(mock.achievement_id);

        expect(mock).toHaveProperty('name');
        expect(mock).toHaveProperty('description');
        expect(mock).toHaveProperty('type');
        expect(mock).toHaveProperty('criteria');
    });

    test('should update achievement with success', async () => {
        const achievement = {
            name: 'Updated achievement',
            description: 'Updated description',
            type: 'solved_puzzles',
            criteria: 100
        };

        const created = await postAchievement(achievement);

        const mock = await updateAchievement(created);

        await deleteAchievement(created.achievement_id);

        expect(mock[0]).toEqual(1);
    });

    test('should update user with success', async () => {
        const user = {
            user_id: 2,
            email: 'email@wp.pl',
            username: 'username',
            role: 'user',
            password: 'password'
        };

        const mock = await updateUser(user);

        expect(mock).toHaveProperty('user_id');
        expect(mock).toHaveProperty('email');
        expect(mock).toHaveProperty('username');
        expect(mock).toHaveProperty('password');
        expect(mock).toHaveProperty('role');

        expect(mock.user_id).toEqual(user.user_id);
        expect(mock.email).toEqual(user.email);
        expect(mock.username).toEqual(user.username);
        expect(mock.role).toEqual(user.role);
        expect(mock.password !== await argon2.hash(user.password)).toBe(true);
    });
});

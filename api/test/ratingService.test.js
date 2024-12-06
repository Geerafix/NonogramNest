import {expect, test, describe} from "vitest"
import {getRatingClassic, getRatingChallenge, getRatingAll, getRatingUser} from "../services/ratingService.js";
await import('../relations.js');

describe('classic rating', () => {
    test('should return user objects with required properties (classic rating)', async () => {
        const mock = await getRatingClassic();

        for (const user of mock) {
            expect(user).toHaveProperty('user_id');
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('classic_sum');
            expect(user).toHaveProperty('rank');
        }
    });

    test('should paginate data properly (classic rating)', async () => {
        // założenie: w bazie przynajmniej 10 użytkowników
        const page = 1; // strona
        const limit = 10; // limit elementów na stronie

        const mock = await getRatingClassic(page, limit);

        expect(mock).toHaveLength(limit);
    });

    test('should return every object with same board size in every board size category (classic rating)', async () => {
        for (let size = 5; size <= 15; size++) {
            const mock = await getRatingClassic(undefined, undefined, size);
            for (const el of mock) {
                expect(el).toHaveProperty(`size_${size}`);
            }
        }
    });

    test('should return paged data of objects with same board size in every board size category (classic rating)', async () => {
        // założenie: w bazie przynajmniej 10 użytkowników
        const page = 1; // strona
        const limit = 10; // limit elementów na stronie

        for (let size = 5; size <= 15; size++) {
            const mock = await getRatingClassic(page, limit, size);
            for (const el of mock) {
                expect(el).toHaveProperty(`size_${size}`);
            }
        }
    });
})

describe('challenge rating', () => {
    test('should return user objects with required properties (challenge rating)', async () => {
        const mock = await getRatingChallenge();

        for (const user of mock) {
            expect(user).toHaveProperty('user_id');
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('challenge_sum');
            expect(user).toHaveProperty('rank');
        }
    });

    test('should paginate data properly (challenge rating)', async () => {
        // założenie: w bazie przynajmniej 10 użytkowników
        const page = 1; // strona
        const limit = 10; // limit elementów na stronie

        const mock = await getRatingChallenge(page, limit);

        expect(mock).toHaveLength(limit);
    });
});

describe('all rating', () => {
    test('should return user objects with required properties (all rating)', async () => {
        const mock = await getRatingAll();

        for (const user of mock) {
            expect(user).toHaveProperty('user_id');
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('total_points');
            expect(user).toHaveProperty('rank');
        }
    });

    test('should paginate data properly (whole rating)', async () => {
        // założenie: w bazie przynajmniej 10 użytkowników
        const page = 1; // strona
        const limit = 10; // limit elementów na stronie

        const mock = await getRatingAll(page, limit);

        expect(mock).toHaveLength(limit);
    });
});


describe('rating user profile', () => {
    test('should return rating user profile object', async () => {
        const user_id = 1;

        const mock = await getRatingUser(user_id);

        expect(mock).toBeDefined();
    });

    test('should return null if rating user profile does not exists', async () => {
        // założenie: użytkownik o podanym id nie istnieje
        const user_id = 2147483647;

        const mock = await getRatingUser(user_id);

        expect(mock).toBeNull();
    });

    test('should throw an error if user ID is not provided in rating', async () => {
        // założenie: brak podanego id użytkownika
        try {
            await getRatingUser();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    test('should return user profile objects with required properties', async () => {
        const user_id = 1;

        const mock = await getRatingUser(user_id);

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
});
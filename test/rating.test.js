import {expect, test} from "vitest";
import {getRatingClassic, getRatingChallenge, getAllRating, getRatingUser} from "@/services/ratingService.js";

test('ensures correct structure of each object (classic rating)', async () => {
    const mock = await getRatingClassic();

    for (const user of mock.data) {
        expect(user).toHaveProperty('user_id');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('classic_sum');
        expect(user).toHaveProperty('rank');
    }
});

test('ensures if pagination works properly (classic rating)', async () => {
    // założenie: w bazie przynajmniej 10 użytkowników
    const page = 1; // strona
    const limit = 10; // limit elementów na stronie

    const mock = await getRatingClassic(page, limit).then(res => res.data);

    expect(mock).toHaveLength(limit);
});

test('ensures if every object has same board size in every board size category (classic rating)', async () => {
    for (let size = 5; size < 16; size++) {
        const mock = await getRatingClassic(undefined, undefined, size).then(res => res.data);
        for (const el of mock) {
            expect(el).toHaveProperty(`size_${size}`);
        }
    }
});

test('ensures correct structure of each object (challenge rating)', async () => {
    const mock = await getRatingChallenge().then(res => res.data);

    for (const user of mock) {
        expect(user).toHaveProperty('user_id');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('challenge_sum');
        expect(user).toHaveProperty('rank');
    }
});

test('ensures if pagination works properly (challenge rating)', async () => {
    // założenie: w bazie przynajmniej 10 użytkowników
    const page = 1; // strona
    const limit = 10; // limit elementów na stronie

    const mock = await getRatingChallenge(page, limit).then(res => res.data);

    expect(mock).toHaveLength(limit);
});



test('ensures correct structure of each object (whole rating)', async () => {
    const mock = await getAllRating().then(res => res.data);

    for (const user of mock) {
        expect(user).toHaveProperty('user_id');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('total_points');
        expect(user).toHaveProperty('rank');
    }
});

test('ensures if pagination works properly (whole rating)', async () => {
    // założenie: w bazie przynajmniej 10 użytkowników
    const page = 1; // strona
    const limit = 10; // limit elementów na stronie

    const mock = await getAllRating(page, limit).then(res => res.data);

    expect(mock).toHaveLength(limit);
});


test('ensures if rating user profile object is returned', async () => {
    const user_id = 1;

    const mock = await getRatingUser(user_id).then(res => res.data);

    expect(mock).toBeDefined();
});

test('ensures if rating user profile exists', async () => {
    // założenie: użytkownik o podanym id nie istnieje
    const user_id = 2147483647;

    const mock = await getRatingUser(user_id).then(res => res.data);

    expect(mock).toBeNull();
});

test('ensures if rating user profile exists', async () => {
    // założenie: brak podanego id użytkownika
    let mock;
    try {
        mock = await getRatingUser().then(res => res.data);
    } catch (error) {
        expect(error).toBeDefined();
    }
});

test('ensures if rating user profile object structure is valid', async () => {
    const user_id = 1;

    const mock = await getRatingUser(user_id).then(res => res.data);

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
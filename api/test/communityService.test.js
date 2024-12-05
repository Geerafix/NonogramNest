import {expect, test, describe} from "vitest"
import {getCommunityPuzzles, getUserPuzzles} from "../services/communityService.js";
await import('../relations.js');

describe('community puzzles', () => {
    test('should return empty users puzzle list (community puzzles)', async () => {
        // założenie: brak podanych parametrów
        const mock = await getCommunityPuzzles();

        expect(mock).toHaveLength(0);
    });

    test('should return users puzzle list (community puzzles)', async () => {
        // założenie: w bazie istnieją 2 plansze użytkownika o id 1, podajemy id innego uż.
        const mock = await getCommunityPuzzles(3);

        expect(mock).toHaveLength(2);
    });

    test('should return users puzzle list (community puzzles)', async () => {
        const mock = await getCommunityPuzzles(3);

        for (const el of mock) {
            expect(el).toHaveProperty('created_id');
            expect(el).toHaveProperty('name');
            expect(el).toHaveProperty('size');
            expect(el).toHaveProperty('username');
        }
    });

    test('should return searched objects with required properties (community puzzles)', async () => {
        // założenie: w bazie istnieje 1 mapa o wybranej nazwie
        const mock = await getCommunityPuzzles(3, 'Test', 'name');

        for (const el of mock) {
            expect(el).toHaveProperty('created_id');
            expect(el).toHaveProperty('name');
            expect(el).toHaveProperty('size');
            expect(el).toHaveProperty('username');
        }
    });

    test('should return searched objects with required properties with option (community puzzles)', async () => {
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
});

describe('user puzzles', () => {

    test('should paginate data properly (user puzzles)', async () => {
        const mock = await getUserPuzzles(1);

        expect(mock).toHaveLength(2);
    });
});

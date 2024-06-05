import { server, client } from '../server.js';

server.get('/nonograms', (req, res) => {
    client.query('SELECT * FROM puzzles', (err, result) => {
        if (!err) {
            res.json(result.rows);
        }
    });
});

server.post('/nonograms', async (req, res) => {
    const result = await client.query('INSERT INTO puzzles (clues_x, clues_y, size) VALUES ($1, $2, $3) RETURNING puzzle_id', [await req.body.cluesX, await req.body.cluesY, await req.body.size]);
    res.json({ id: result.rows[0].puzzle_id });
});

server.post('/solved', async (req, res) => {
    await client.query(
        'INSERT INTO solved_puzzles (puzzle_id, user_id, time, points) VALUES ($1, $2, $3, $4)', 
        [await req.body.puzzleId, await req.session.user.user_id, await req.body.time, await req.body.points]
    );
    res.json();
});
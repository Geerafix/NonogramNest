import { server, client } from '../server.js';

server.get('/nonograms', (req, res) => {
    client.query('SELECT * FROM nonograms', (err, result) => {
        if (!err) {
            res.json(result.rows);
        }
    });
});

server.post('/nonograms', async (req, res) => {
    client.query('INSERT INTO nonograms (cluesx, cluesy) VALUES ($1, $2)', [await req.body.cluesX, await req.body.cluesY]);
    res.json();
});
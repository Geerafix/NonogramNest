import pg from 'pg';
import express from 'express';
import cors from 'cors';
import('./endpoints/users.js');
import('./endpoints/nonograms.js');

const { Client } = pg;
export const server = express();
export const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 4001,
    password: "admin",
    database: "nonogram-database"
});

client.connect();
server.use(express.json());
server.use(cors());

server.listen(3000, () => { console.log('Server started'); });
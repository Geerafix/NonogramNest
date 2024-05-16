import pg from 'pg';
import pgSession from 'connect-pg-simple';
import express from 'express';
import cors from 'cors';
import session from 'express-session'

import('./endpoints/users.js');
import('./endpoints/nonograms.js');

const connectionString = 'postgres://postgres:admin@localhost:4001/nonogram-database';
const { Client } = pg;
const pgStore = pgSession(session);

export const server = express();
export const client = new Client({ connectionString });

client.connect();

server.use(express.json());

server.use(cors({
    origin: true,
    credentials: true
}));

server.use(session({
    store: new pgStore({
        conString: connectionString,
        createTableIfMissing: true
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
}));

server.listen(3000, () => { });
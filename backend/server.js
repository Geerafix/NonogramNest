import pgSession from 'connect-pg-simple';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { Sequelize } from 'sequelize';
// import path from 'path';
// import { fileURLToPath } from 'url';
import('./endpoints/users.js');
import('./endpoints/puzzles.js');

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const connectionString = 'postgres://postgres:admin@localhost:5432/nonogram-database';
const pgStore = pgSession(session);

export const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false
});
export const server = express();

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
// server.use(express.static(path.join(__dirname, '../dist')));
// server.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../dist', 'index.html'));
// });
server.listen(3000, () => { });
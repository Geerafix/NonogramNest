import express from 'express';
import dotenv from "dotenv";
import {Sequelize} from 'sequelize';
import cors from 'cors';
import cookieParser from "cookie-parser";
import {errorHandler} from "./utils.js";

dotenv.config({path: '../.env'});

const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_network = process.env.DB_NETWORK;
const db_port = process.env.DB_PORT;
const db_database = process.env.DB_NAME;
const server_port = process.env.VITE_SERVER_PORT;

const connectionString = `postgres://postgres:admin@localhost:5432/nonogram-database`;

export const sequelize = new Sequelize(connectionString, { dialect: 'postgres', logging: false });

console.log("Setting relations...");
import('./relations.js')
    .then((res) => console.log("Relations set."))
    .catch((err) => console.log("Error while setting relations."));

import('./endpoints/rating.js');
import('./endpoints/puzzles.js');
import('./endpoints/community.js');
import('./endpoints/challenge.js');
import('./endpoints/user.js');
import('./endpoints/admin.js');
import('./endpoints/auth.js');

import('./services/userService.js');
import('./services/adminService.js');
import('./services/ratingService.js');
import('./services/puzzleService.js');
import('./services/challengeService.js');
import('./services/communityService.js');

export const server = express();

server.use(express.json());

server.use(cookieParser());

server.use(cors({ origin: true, credentials: true }));

server.use(errorHandler);

server.listen(server_port, () => { console.log("Server (re)started") });
import express from 'express';
import dotenv from "dotenv";
import {Sequelize} from 'sequelize';
import cors from 'cors';
import cookieParser from "cookie-parser";
import {errorHandler} from "./utils.js";

import('./endpoints/user.js');
import('./endpoints/rating.js');
import('./endpoints/puzzles.js');
import('./endpoints/community.js');
import('./endpoints/challenge.js');
import('./endpoints/achievements.js');
import('./endpoints/admin.js');

dotenv.config({path: '../.env'});

const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_network = process.env.DB_NETWORK;
const db_port = process.env.DB_PORT;
const db_database = process.env.DB_NAME;
const server_port = process.env.VITE_SERVER_PORT;

const connectionString = `postgres://${db_user}:${db_password}@${db_network}:${db_port}/${db_database}`;

export const sequelize = new Sequelize(connectionString, { dialect: 'postgres', logging: false });

export const server = express();

server.use(express.json());

server.use(cookieParser());

server.use(cors({ origin: true, credentials: true }));

server.use(errorHandler);

server.listen(server_port, () => { console.log("Server (re)started") });
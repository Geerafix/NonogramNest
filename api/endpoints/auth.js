import {server} from "../server.js";
import {Op} from "sequelize";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import {User} from "../models/User.js";
import {asyncHandler} from "../utils.js";

server.post('/api/signin', asyncHandler(async (req, res) => {
    const user = await User.findOne({
        where: {[Op.or]: [{username: await req.body.username}, {email: await req.body.username}]}
    });

    if (user && await argon2.verify(user.password, await req.body.password)) {
        const token = jwt.sign(
            JSON.stringify(user),
            process.env.JWT_SECRET,
        );
        res.cookie('token', token, {httpOnly: true});
        res.json(token);
    } else {
        res.status(404).json();
    }
}));

server.post('/api/signup', asyncHandler(async (req, res) => {
    const email = await req.body.email;
    const username = await req.body.username;
    const password = await req.body.password;

    const hash = await argon2.hash(password);

    const created = await User.create({
        email: email,
        username: username,
        password: hash
    });

    res.json(created);
}));
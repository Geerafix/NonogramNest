import {sequelize} from '../server.js';
import {DataTypes} from 'sequelize';

import {UserProfile} from './UserProfile.js';
import {Score} from './Score.js';
import * as argon2 from "argon2";

export const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    role: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    tableName: 'Users',
    timestamps: false,
    hooks: {
        afterCreate: async (user, options) => {
            await UserProfile.create({user_id: user.user_id});
            await Score.create({user_id: user.user_id});
        },
        afterDestroy: async (user, options) => {
            await UserProfile.destroy({where: {user_id: user.user_id}});
            await Score.destroy({user_id: user.user_id});
        }
    }
});
import { sequelize } from '../server.js';
import { DataTypes } from 'sequelize';

import { UserProfile } from './UserProfile.js';
import { Score } from './Score.js';

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
        afterCreate: (user, options) => {
            UserProfile.create({ user_id: user.user_id });
            Score.create({ user_id: user.user_id });
        },
        afterDestroy: (user, options) => {
            UserProfile.destroy({ where: { user_id: user.user_id } });
        }
    }
});
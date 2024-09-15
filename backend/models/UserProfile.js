import { sequelize } from '../server.js';
import { DataTypes } from 'sequelize';

export const UserProfile = sequelize.define('UserProfile', {
    user_profile_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'No bio'
    },
    solved_puzzles: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_play_time: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    register_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    }
}, {
    tableName: 'user_profile',
    timestamps: false
});
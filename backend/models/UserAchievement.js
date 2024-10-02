import { sequelize } from '../server.js';
import { DataTypes } from 'sequelize';

export const UserAchievement = sequelize.define('UserAchievement', {
    user_achievement_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    achievement_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_achieved: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'UserAchievements',
    timestamps: false
});
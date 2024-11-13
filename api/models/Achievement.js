import {sequelize} from '../server.js';
import {DataTypes} from 'sequelize';

export const Achievement = sequelize.define('Achievement', {
    achievement_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    criteria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'Achievements',
    timestamps: false
});
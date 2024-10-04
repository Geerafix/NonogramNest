import {sequelize} from '../server.js';
import {DataTypes} from 'sequelize';

export const Criterion = sequelize.define('Criterion', {
    criteria_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    achievement_id: {
        type: DataTypes.INTEGER,
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
    tableName: 'Criteria',
    timestamps: false
});
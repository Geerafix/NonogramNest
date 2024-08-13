import { sequelize } from '../server.js';
import { DataTypes } from 'sequelize';

export const Puzzle = sequelize.define('Puzzle', {
    puzzle_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clues_x: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    clues_y: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    } 
}, {
    tableName: 'puzzles',
    timestamps: false
});
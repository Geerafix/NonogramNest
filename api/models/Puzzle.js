import {sequelize} from '../server.js';
import {DataTypes} from 'sequelize';

export const Puzzle = sequelize.define('Puzzle', {
    puzzle_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    clues_x: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    clues_y: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    excluded_tiles: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Puzzles',
    timestamps: false
});
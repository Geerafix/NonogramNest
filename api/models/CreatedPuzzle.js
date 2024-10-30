import {sequelize} from '../server.js';
import {DataTypes} from 'sequelize';
import {Puzzle} from './Puzzle.js';

export const CreatedPuzzle = sequelize.define('CreatedPuzzle', {
    created_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    puzzle_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    }
}, {
    tableName: 'CreatedPuzzles',
    timestamps: false
});
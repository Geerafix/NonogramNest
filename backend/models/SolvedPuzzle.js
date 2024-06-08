import { sequelize } from '../server.js';
import { DataTypes } from 'sequelize';

export const SolvedPuzzle = sequelize.define('SolvedPuzzle', {
  solved_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  puzzle_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  time: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  points: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  }
}, {
    tableName: 'solved_puzzles',
    timestamps: false
});
import { sequelize } from '../server.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.BIGINT,
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
    tableName: 'users',
    timestamps: false
});

const Puzzle = sequelize.define('Puzzle', {
    puzzle_id: {
      type: DataTypes.BIGINT,
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
      defaultValue: 'user'
    } 
}, {
    tableName: 'puzzles',
    timestamps: false
});

const SolvedPuzzle = sequelize.define('SolvedPuzzle', {
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

export { User, Puzzle, SolvedPuzzle };

User.hasMany(SolvedPuzzle, {
    foreignKey: 'user_id'
});
  
Puzzle.hasMany(SolvedPuzzle, {
    foreignKey: 'puzzle_id'
});

SolvedPuzzle.belongsTo(User, {
    foreignKey: 'user_id'
});

SolvedPuzzle.belongsTo(Puzzle, {
    foreignKey: 'puzzle_id'
});
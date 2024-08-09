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
    answers: {
      type: DataTypes.TEXT,
      allowNull: true,
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

const DailyChallenge = sequelize.define('DailyChallenge', {
  daily_id: {
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
  answers: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  time: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  points: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  is_solved: {
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
  tableName: 'daily_challenges',
  timestamps: false
});

const UserProfile = sequelize.define('UserProfile', {
  user_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
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
    type: DataTypes.BIGINT,
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

User.hasMany(SolvedPuzzle, {
  foreignKey: 'user_id'
});

User.hasMany(DailyChallenge, {
  foreignKey: 'user_id'
});

User.hasOne(UserProfile, {
  foreignKey: 'user_id'
});

UserProfile.hasOne(User, {
  foreignKey: 'user_id'
});
  
Puzzle.hasMany(SolvedPuzzle, {
    foreignKey: 'puzzle_id'
});

Puzzle.hasMany(DailyChallenge, {
  foreignKey: 'puzzle_id'
});

SolvedPuzzle.belongsTo(User, {
    foreignKey: 'user_id'
});

SolvedPuzzle.belongsTo(Puzzle, {
    foreignKey: 'puzzle_id'
});

DailyChallenge.belongsTo(User, {
  foreignKey: 'user_id'
});

DailyChallenge.belongsTo(Puzzle, {
  foreignKey: 'puzzle_id'
});

// uncomment to migrate models
// await User.sync({ force: true });
// await UserProfile.sync({ force: true });
// await Puzzle.sync({ force: true });
// await SolvedPuzzle.sync({ force: true });
// await DailyChallenge.sync({ force: true });

export { 
  User, 
  UserProfile,
  Puzzle, 
  SolvedPuzzle, 
  DailyChallenge 
};


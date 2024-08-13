import { DailyChallenge } from "../DailyChallenge.js";
import { Puzzle } from "../Puzzle.js";
import { Rating } from "../Rating.js";
import { SolvedPuzzle } from "../SolvedPuzzle.js";
import { User } from "../User.js";
import { UserProfile } from "../UserProfile.js";

User.hasMany(SolvedPuzzle, { foreignKey: 'user_id' });
User.hasMany(DailyChallenge, { foreignKey: 'user_id' });
User.hasOne(UserProfile, { foreignKey: 'user_id' });
User.hasOne(Rating, { foreignKey: 'user_id' });

UserProfile.hasOne(User, { foreignKey: 'user_id' });
UserProfile.belongsTo(User, { foreignKey: 'user_id' });

Puzzle.hasMany(SolvedPuzzle, { foreignKey: 'puzzle_id' });
Puzzle.hasMany(DailyChallenge, { foreignKey: 'puzzle_id' });

SolvedPuzzle.belongsTo(User, { foreignKey: 'user_id' });
SolvedPuzzle.belongsTo(Puzzle, { foreignKey: 'puzzle_id' });

DailyChallenge.belongsTo(User, { foreignKey: 'user_id' });
DailyChallenge.belongsTo(Puzzle, { foreignKey: 'puzzle_id' });

Rating.belongsTo(User, { foreignKey: 'user_id' });
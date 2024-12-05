import {User} from "./models/User.js";
import {SolvedPuzzle} from "./models/SolvedPuzzle.js";
import {DailyChallenge} from "./models/DailyChallenge.js";
import {CreatedPuzzle} from "./models/CreatedPuzzle.js";
import {UserProfile} from "./models/UserProfile.js";
import {Score} from "./models/Score.js";
import {UserAchievement} from "./models/UserAchievement.js";
import {Message} from "./models/Message.js";
import {Puzzle} from "./models/Puzzle.js";
import {Achievement} from "./models/Achievement.js";

User.hasMany(SolvedPuzzle, {foreignKey: 'user_id'});
User.hasMany(DailyChallenge, {foreignKey: 'user_id'});
User.hasMany(CreatedPuzzle, {foreignKey: 'user_id'});
User.hasOne(UserProfile, {foreignKey: 'user_id'});
User.hasOne(Score, {foreignKey: 'user_id'});
User.hasMany(UserAchievement, {foreignKey: 'user_id'});
User.hasMany(Message, {foreignKey: 'user_id'});

Puzzle.hasMany(SolvedPuzzle, {foreignKey: 'puzzle_id'});
Puzzle.hasMany(DailyChallenge, {foreignKey: 'puzzle_id'});
Puzzle.hasOne(CreatedPuzzle, {foreignKey: 'puzzle_id'});

Achievement.hasMany(UserAchievement, {foreignKey: 'achievement_id'});

UserAchievement.belongsTo(User, {foreignKey: 'user_id'});

UserProfile.belongsTo(User, {foreignKey: 'user_id'});

Score.belongsTo(User, {foreignKey: 'user_id'});

SolvedPuzzle.belongsTo(User, {foreignKey: 'user_id'});
SolvedPuzzle.belongsTo(Puzzle, {foreignKey: 'puzzle_id'});

DailyChallenge.belongsTo(User, {foreignKey: 'user_id'});
DailyChallenge.belongsTo(Puzzle, {foreignKey: 'puzzle_id'});

CreatedPuzzle.belongsTo(User, {foreignKey: 'user_id'});
CreatedPuzzle.belongsTo(Puzzle, {foreignKey: 'puzzle_id'});

Message.belongsTo(User, {foreignKey: 'user_id'});

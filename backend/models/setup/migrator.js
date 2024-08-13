import { User } from "../User.js";
import { UserProfile } from "../UserProfile.js";
import { Puzzle } from "../Puzzle.js";
import { SolvedPuzzle } from "../SolvedPuzzle.js";
import { DailyChallenge } from "../DailyChallenge.js";
import { Rating } from "../Rating.js";
import('./relations.js');

// uncomment to migrate models

// await User.sync({ force: true });
// await UserProfile.sync({ force: true });
// await Puzzle.sync({ force: true });
// await SolvedPuzzle.sync({ force: true });
// await DailyChallenge.sync({ force: true });
// await Rating.sync({ force: true });

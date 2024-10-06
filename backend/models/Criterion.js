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
    timestamps: false,
    hooks: {
        async afterSync(options) {
            await Criterion.create({
                achievement_id: 1,
                type: 'solved_puzzles',
                criteria: 1
            });

            await Criterion.create({
                achievement_id: 2,
                type: 'solved_puzzles',
                criteria: 2
            });
        }
    }
});
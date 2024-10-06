import {sequelize} from '../server.js';
import {DataTypes} from 'sequelize';

export const Achievement = sequelize.define('Achievement', {
    achievement_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    criteria_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'Achievements',
    timestamps: false,
    hooks: {
        async afterSync(options) {
            await Achievement.create({
                criteria_id: 1,
                name: 'Początkujący I',
                description: 'Ukończ 1 nonogram.'
            });

            await Achievement.create({
                criteria_id: 2,
                name: 'Początkujący II',
                description: 'Ukończ 2 nonogramy.'
            });
        }
    }
});
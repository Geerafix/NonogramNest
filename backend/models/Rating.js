import { sequelize } from '../server.js';
import { DataTypes } from 'sequelize';

export const Rating = sequelize.define('Rating', {
    rating_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    size_5: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    size_6: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    size_7: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    size_8: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    size_9: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    size_10: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    size_11: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    size_12: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    size_13: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    size_14: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    size_15: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    sum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'rating',
    timestamps: false
});
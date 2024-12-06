import {sequelize} from '../server.js';
import {DataTypes} from 'sequelize';

export const Message = sequelize.define('Message', {
    message_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    }
}, {
    tableName: 'Messages',
    timestamps: false
});
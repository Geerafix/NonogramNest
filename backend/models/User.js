import { sequelize } from '../server.js';
import { DataTypes } from 'sequelize';

export const User = sequelize.define('User', {
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
// src/models/user.model.ts
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config';
import { UserInstance } from '../types/auth.types';



const User = sequelize.define<UserInstance>('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
  defaultScope: {                                     // Excludes password by default (security best practice).
    attributes: { exclude: ['password'] },            // Hide password by default
  },
  scopes: {
    withPassword: {                                   // Explicitly includes password when needed (e.g., for authentication).
      attributes: { include: ['password'] },          // Include password when explicitly requested
    },
  },
});

export default User;
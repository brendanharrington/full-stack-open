import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config.js';

export const sequelize = new Sequelize(DATABASE_URL);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('connected to the database');
  } catch (error) {
    console.log('failed to connect to the database');
    console.log('error:', error);
    return process.exit(1);
  }

  return null;
};

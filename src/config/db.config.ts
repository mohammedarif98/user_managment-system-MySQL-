import { Sequelize } from 'sequelize';
import { appConfig } from "./app.config"
import mysql from 'mysql2/promise';


interface DbConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}


const dbConfig: DbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'user_management_system'
};


// Check and create the database if it doesn't exist
const ensureDatabaseExists = async () => {
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.username,
      password: dbConfig.password,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    console.log(`Database "${dbConfig.database}" is ready.`);
    await connection.end();
  } catch (error) {
    console.error('Error ensuring database exists:', error);
    process.exit(1);
  }
};


// Initialize Sequelize
const sequelize = new Sequelize({
    dialect: "mysql",
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    logging: appConfig.isProduction ? false : console.log,
    pool: { 
        max: 5, 
        min: 0, 
        acquire: 30000, 
        idle: 10000 
    },
    define: {
            timestamps: true,
            underscored: true,         // Recommended for snake_case columns
            freezeTableName: true      // Prevents pluralization of table names
        }
});


// Connect DB with pre-check
export const connectDB = async (): Promise<void> => {
    try {
        await ensureDatabaseExists();
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        if (!appConfig.isProduction) {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized');
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};



export default sequelize;

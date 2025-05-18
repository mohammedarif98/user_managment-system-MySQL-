import dotenv from "dotenv";

dotenv.config();


interface JwtConfig {
  secret: string;
  expiration: string;
}

interface AppConfig {
  port: number;
  env: string;
  isProduction: boolean;
  apiPrefix: string;
  jwt: JwtConfig;
}



const jwtConfig: JwtConfig = {
  secret: process.env.JWT_SECRET || 'your-secure-key-here',
  expiration: process.env.JWT_EXPIRATION || '1h',
};


export const appConfig: AppConfig = {
  port: Number(process.env.PORT) || 4000,
  env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  apiPrefix: '/api',
  jwt: jwtConfig,
}; 
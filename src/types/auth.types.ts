import { Model } from 'sequelize';



declare global {
  namespace Express {
    interface Request {
      user?: UserInstance;
    }
  }
}


export interface UserAttributes {
    id? : number;
    username: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface UserInstance extends Model<UserAttributes>, UserAttributes {}


export interface AuthResponse {
    user: Omit<UserAttributes, 'password'>;
    token?: string;
}


export interface TokenPayload {
    id : number;
    email: string;
}


// ---------------- For requests -------------------
// export type RegisterRequest = {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// };

// export type LoginRequest = {
//   email: string;
//   password: string;
// };
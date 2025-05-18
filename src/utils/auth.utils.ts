import { appConfig } from "../config/app.config";
import { TokenPayload } from "../types/auth.types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload as object, // Explicitly cast payload to object
    appConfig.jwt.secret as jwt.Secret, // Ensure secret is of correct type
    { 
      expiresIn: appConfig.jwt.expiration 
    } as jwt.SignOptions // Type assertion for options
  );
};



export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, appConfig.jwt.secret) as TokenPayload;
  } catch (err) {
    return null;
  }
};



export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};



export const comparePasswords = async (password: string, hashedPassword: string ): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

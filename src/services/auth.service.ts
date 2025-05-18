import User from "../models/user.model";
import { AuthResponse, UserInstance } from "../types/auth.types";
import { comparePasswords, generateToken, hashPassword, verifyToken } from "../utils/auth.utils";



export const registerUser = async (
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    ): Promise<AuthResponse> => {
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error("User already exists with this email");
    }

    const hashedPassword = await hashPassword(password);
    const user = (await User.create({
        username,
        email,
        password: hashedPassword,
    })) as UserInstance;

    return {
        user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        },
    };
};



export const userLogin = async(email: string, password: string): Promise<AuthResponse> => {

    const user = await User.scope('withPassword').findOne({ where: {email} }) as UserInstance | null;

    if( !email || !password){
        throw new Error("email and password fields are required");
    }

    if( !user || !user.password ){
        throw new Error("invvalid Credential")
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = generateToken({ id: user.id!, email: user.email });

    return {
        user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
        },
        token
    };
}

export const getCurrentUser = async( userId: number | undefined ): Promise<UserInstance | null> => {
    if (!userId) return null;
    return await User.findByPk(userId);
}


export const verifyAuthToken = async (token: string): Promise<UserInstance | null> => {
  const decoded = verifyToken(token);
  if (!decoded) return null;
  return await getCurrentUser(decoded.id);
};
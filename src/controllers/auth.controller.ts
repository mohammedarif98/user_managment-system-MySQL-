import { getCurrentUser, registerUser, userLogin } from "../services/auth.service";
import { Request, Response } from "express";



export const register = async( req: Request, res: Response): Promise<void> => {
    try{
        const { username, email, password, confirmPassword } = req.body;
        const result = await registerUser( username, email, password, confirmPassword );
        res.status(201).json({ data: result, message: "User register successfully" });
    }catch(error: unknown){
        const errorMessage = error instanceof Error ? error.message : "unknown error found"
        res.status(500).json({ error: "internal server error", message: errorMessage });
    }
}

export const login = async( req: Request, res: Response): Promise<void> => {
    try{
        const { email, password } = req.body;
        const result = await userLogin( email, password )
        res.status(200).json({ data: result, message: "User Login successfully" });
    }catch(error: unknown){
        const errrorMessage = error instanceof Error ? error.message : "unknown error found"
        res.status(500).json({ error: "intrnal server error", messsage: errrorMessage });
    }
}


export const me = async( req: Request, res: Response ): Promise<void> => {
    try{
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized - No user information found" });
            return;
        }
        const user = await getCurrentUser(userId);   
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        } 
        res.status(200).json({ data: user, message: "User data retrieved successfully" });
    }catch(error: unknown){
        const errorMessage =  error instanceof Error ? error.message : "unknown error found"
        res.status(500).json({ error: "internal server error", message: errorMessage });
    }
}
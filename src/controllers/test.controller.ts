import { Request, Response } from "express"
import { getSampleData } from "../services/data.service";


export async function getData( req: Request, res: Response ) {
    try{
        const data = await getSampleData()
        res.status(200).json({ status: "success", data });
    }catch(error: any){
        res.status(500).json({
            status: "fail",
            error: "internal server error!",
            message: error.message
        });
    }
}



export const filterData = async (req: Request, res: Response) => {
    try {
        const data = await getSampleData();
        const names = data.map((item) => item.name);
        
        res.status(200).json({ 
            status: "success",
            message: "Names retrieved successfully",
            data: names,
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({
            status: "fail",
            error: "Internal server error",
            message: errorMessage
        });
    }
}; 
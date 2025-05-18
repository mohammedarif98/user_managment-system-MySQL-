import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { appConfig } from "./config/app.config";
import dataRouter  from "./routes/test.route"
import authRouter from './routes/auth.route'
import { connectDB } from "./config/db.config";


const app: Application = express();

// Initialize database
connectDB();

// security middleware
app.use(helmet())
app.use(cors())

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Logging middleware
if(! appConfig.isProduction){
    app.use(morgan('dev'));
}

// API routes with versioning
app.use(`${appConfig.apiPrefix}/v1/test`, dataRouter);
app.use(`${appConfig.apiPrefix}/v1/auth`, authRouter); 

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Not Found" });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    console.log(err.stack);
    res.status(500).json({
        message: "Internal Server Error",
        error: appConfig.isProduction ? undefined : err.message
    })
});


export default app;
import app from "./app";
import { appConfig } from "./config/app.config";

const PORT = appConfig.port;

app.listen( PORT, ()=> {
    console.log(`sever is running on http://localhost:${PORT}`);
    // console.log(`API Documentation: http://localhost:${PORT}${appConfig.apiPrefix}/v1/test/docs`);
})
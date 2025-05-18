import { Router } from "express";
import { filterData, getData } from "../controllers/test.controller";

const router  = Router();


router.get("/data", getData);
router.get("/names", filterData);


// Documentation route
router.get("/docs", (req, res) => {
    res.json({
        message: "API Documentation",
        endpoints: {
            data: {
                method: "GET",
                path: "/api/v1/test/data",
                description: "Get all sample data"
            },
            names: {
                method: "GET",
                path: "/api/v1/test/names",
                description: "Get only names from data"
            }
        },
    });
});

export default router;
import { Router } from "express";
import { login, me, register } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = Router();


router.post("/register", register);
router.post("/login", login);
router.get("/get-user", authenticate, me);

export default router;

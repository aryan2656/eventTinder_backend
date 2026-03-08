import { Router } from "express";
import authRouter from "./auth.routes.js"
import profileRouter from "./profile.routes.js"
import cookieParser from "cookie-parser"

const router = Router();

router.use("/auth", authRouter);
router.use("/api", profileRouter)

export default router;
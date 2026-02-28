import { Router } from "express";
import authRouter from "./auth.routes.js"
import cookieParser from "cookie-parser"

const router = Router();

router.use("/auth", authRouter);

export default router;
import { Router } from "express";
import authRouter from "./auth.routes.js"
import matchRouter from "./match.routes.js"
import profileRouter from "./profile.routes.js"
import cookieParser from "cookie-parser"

const router = Router();

router.use("/auth", authRouter);
router.use("/api", profileRouter)
router.use("/matchapi",matchRouter )

export default router;
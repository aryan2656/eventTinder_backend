import { Router } from "express";
import authRouter from "./auth.routes.js"
import cookieParser from "cookie-parser"

const router = Router();

// router.get("/api/test", (req, res) => {
//     console.log("Name is:", req.cookies)
//     res.json({ message: "Routes working!" });
// });

router.use("/auth", authRouter);

export default router;
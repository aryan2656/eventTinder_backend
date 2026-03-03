import { Router } from "express"
import {Request, Response } from "express"
import verifyToken from "../middlewares/authMiddleware.js";

const router = Router()

router.get("/profile", verifyToken, (req : Request, res: Response) => {
  res.json({
    message: "You are authenticated",
    userId: req.userId,
  });
});

export default router
import { Router } from "express"
import matchController from "../controllers/match.controller.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/match",verifyToken, matchController.getData)

export default router


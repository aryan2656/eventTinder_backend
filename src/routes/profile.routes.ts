import { Router, Request, Response } from "express"
import profileController from "../controllers/profile.controller.js"
import verifyToken from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/profile", async (req: Request, res: Response) => {
    try{
        const response = await profileController.getProfileDetails()
    }catch(error){
        return res.status(500).json({})
    }
} )

router.post("/profile", verifyToken, async (req: Request, res: Response) => {
    try{
        if(!req.userId) return res.status(401).json({ message: "Unauthorized"})
        const response = await profileController.save(req.body, req.userId)
        return res.status(response.status).json(response)
    }catch(error){
        return res.status(500).json({ message: "Failed to update interest and goals"})
    }
} )

export default router
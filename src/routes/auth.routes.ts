import { Router } from "express"
import {Request, Response } from "express"
import authController from "../controllers/auth.controller.js"

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
    try {
        const result = await authController.signup(req.body)
        res.status(result.status).json(result)
    }catch(err){
        res.status(500).json({ message: "Server error", error: err})
    }
});

router.post("/signin", async (req: Request, res: Response) => {
    try{
        const result = await authController.signIn(req.body)

        // Setting cookie 
        if(result.success && result.token){
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "strict",
                maxAge: 7*24*60*60*1000
            })
        }
        res.status(result.status).json(result)
    }catch(err){
        res.status(500).json({message: "Server error", error: err})
    }
})
export default router;

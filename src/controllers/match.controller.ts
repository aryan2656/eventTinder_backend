import { match } from "node:assert";
import { Request, Response } from "express"
import matchService from "../services/match.service.js";

class MatchController {

    cosineSimilarity = (vecA: number[], vecB: number[]) => {
    // dot product
    const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i]!, 0)  

    // magnitude of A = square root of sum of squares
    const magA = Math.sqrt(vecA.reduce((sum, val, i) => sum + val * val, 0))

    // magnitude of B
    const magB = Math.sqrt(vecB.reduce((sum, val, i) => sum + val * val, 0))

    // return dot / (magA * magB)
    return dot / (magA * magB)
    }

    // getData = async (req: Request, res:Response) => {
    //     try{
    //         if(req.userId){
    //             console.log(req.userId)
    //             const response = await matchService.getUser(req.userId);
    //             console.log("Vector is :", response?.vector)

    //             const allUser = await matchService.getAllUser(req.userId)
    //             const validUsers = allUser.filter(u => u.vector && u.vector.length > 0)

    //             console.log(allUser)
    //             if(response && allUser){
    //             const cosineSimilar = validUsers.map((user) => ({
    //                 user,
    //                 score : this.cosineSimilarity(user.vector, response?.vector)
    //             }))

    //             const top5 = cosineSimilar.sort((a, b) => b.score - a.score).slice(0, 5)
    //             console.log("Top 5 users: ", top5)
    //             }

    //         }
    //         // else{
    //         //     return throw new Error("Invalid credentials")
    //         // }    
    //         return {
    //             status: 200,
    //             message: "Match found",
    //             success: true
    //         }        


    //     }catch(error){
    //         return {
    //             status: 500,
    //             message: "Not able to get perfect match",
    //             success: false
    //         }
    //     }
    // }

    getData = async (req: Request, res: Response) => {
    try {
        if (!req.userId) return { status: 401, success: false, message: "Unauthorized" }

        const currentUser = await matchService.getUser(req.userId)
        if (!currentUser?.vector?.length) return { status: 400, success: false, message: "Profile incomplete" }

        const allUsers = await matchService.getAllUser(req.userId)

        const validUsers = allUsers.filter(u => u.vector && u.vector.length > 0)

        const top5 = validUsers
            .map(user => ({ user, score: this.cosineSimilarity(user.vector!, currentUser.vector!) }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)

        return res.status(200).send({message: "Match found", data: top5});

    } catch (error) {
        console.log("Error:", error)
        return res.status(500).send({message: "Not able to get matched", success: false})
    }
}
}

const matchController = new MatchController();
export default matchController;
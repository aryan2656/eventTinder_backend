import UserModel from "../models/dao/user.model.js";
import { ProfileRequest } from "../models/request/profile.requests.js";
import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config()

// Check if OpenAI API key exists before initializing
if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required but not found in environment variables");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

class ProfileRepository{
    save = async (data: ProfileRequest, userId: string) => {
    const response = await UserModel.findOneAndUpdate({_id : userId},  {$set : { interests: data.interests, goals: data.goals , profileCompleted: true}}, { new: true})
    return response
    }

    saveEmbeddings = async ( finalString: string, userId: string) => {
        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: finalString
        })

        const response = await UserModel.findOneAndUpdate({_id: userId}, {$set: {vector: embedding.data[0]?.embedding}})
        return response
    }
}

const profileRepository = new ProfileRepository();
export default profileRepository;
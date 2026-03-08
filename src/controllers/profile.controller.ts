import { ProfileRequest } from "../models/request/profile.requests.js"
import profileService from "../services/profile.service.js";

class ProfileController {
    getProfileDetails = () => {

    }

    save = async ( data: ProfileRequest, userId : string ) => {
        try{
        const { interests, goals } = data
        // send data to service
        const user = await profileService.save(data, userId);
        if(!user) throw new Error("User not found")
        
        const interestString = interests.join(",");
        const goalsString = goals.join(",");

        const finalString = `I am interested in ${interestString}. My goals are ${goalsString}`

        const response = await profileService.saveEmbeddings(finalString, userId)
        if(!response) throw new Error("Vector embeddings not saved")
            
        return {
            status: 200,
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
        // send response back to client
        }catch(error){
            console.log("Error is: ", error)
            return {
                status: 500,
                success: false,
                data: {
                    message: "Interest and goals are not updated"
                }
            }
        }
    }
}

const profileController = new ProfileController()
export default profileController
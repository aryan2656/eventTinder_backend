import { ProfileRequest } from "../models/request/profile.requests.js"
import profileService from "../services/profile.service.js";

class ProfileController {
    getProfileDetails = () => {

    }

    save = async ( data: ProfileRequest, userId : string ) => {
        // client sends data like interests and goals with token of identification

        // I need to save data in profile which already exists the data coming is interest and goals how can i do that 
        try{
        // send data to service
        const user = await profileService.save(data, userId);
        if(!user) throw new Error("User not found")
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
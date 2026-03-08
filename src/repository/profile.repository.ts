import UserModel from "../models/dao/user.model.js";
import { ProfileRequest } from "../models/request/profile.requests.js";

class ProfileRepository{
   save = async (data: ProfileRequest, userId: string) => {
    const response = await UserModel.findOneAndUpdate({_id : userId},  {$set : { interests: data.interests, goals: data.goals , profileCompleted: true}}, { new: true})
    return response
}
}

const profileRepository = new ProfileRepository();
export default profileRepository;
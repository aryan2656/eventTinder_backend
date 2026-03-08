import { ProfileRequest } from "../models/request/profile.requests.js";
import profileRepository from "../repository/profile.repository.js";

class ProfileService {
    save = async (data: ProfileRequest, userId: string) => {
        const response = await profileRepository.save(data, userId)
        return response;
    }
}

const profileService = new ProfileService();
export default profileService
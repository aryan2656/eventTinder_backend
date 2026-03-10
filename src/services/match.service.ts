import matchRepository from "../repository/match.repository.js"

class MatchService {
    getUser = async (userId: string) => {
        const user = await matchRepository.getUser(userId);
        return user;
    }

    getAllUser = async (userId: string) => {
        const allUser = await matchRepository.getAllUser(userId);
        return allUser
    }
}

const matchService = new MatchService()
export default matchService
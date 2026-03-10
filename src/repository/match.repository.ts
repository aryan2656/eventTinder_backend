import UserModel from "../models/dao/user.model.js"

class MatchRepository {

    getUser = async (userId: string) => {
        const user = await UserModel.findById(userId)
        return user
    }

    getAllUser = async (userId: string) => {
        const allUser = await UserModel.find({ _id: { $ne: userId } })
        return allUser
    }
}

const matchRepository = new MatchRepository()
export default matchRepository
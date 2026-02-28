import mongoose from "mongoose";
const connectDatabase = async () => {
    try {
        // Checking for URI existence in env file
        if (!process.env.MONGO_URI)
            return false;
        // Connecting with mongodb database
        await mongoose.connect(process.env.MONGO_URI)
            // If successful printing success message in console
            .then(() => {
            console.log("Connected successfully to database");
        })
            .catch((error) => {
            console.error(error);
        });
    }
    catch (error) {
        console.log(error);
        await mongoose.disconnect();
    }
};
export default connectDatabase;
//# sourceMappingURL=database.js.map
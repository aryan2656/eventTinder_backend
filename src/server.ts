import dotenv from "dotenv";
import app from "./app.js"
import  connectDatabase  from "./config/database.js"

// loading environment variables
dotenv.config({ path: "./.env" })

// connecting to database
connectDatabase()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
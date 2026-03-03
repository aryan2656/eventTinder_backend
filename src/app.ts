import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import routes from "./routes/index.js"
import profileRoutes from "./routes/protectedRoute.js";

const app = express();

app.use(cookieParser())
app.use(cors());
app.use(express.json());

app.use("/api", profileRoutes)

app.get("/",(req, res) => {
    res.cookie("name","aryan")
    res.send(" it's working")
});

app.use(routes);

export default app;
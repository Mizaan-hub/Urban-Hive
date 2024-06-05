import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import UserRoute from "./routes/user.route.js";
import PostRoute from "./routes/post.route.js";

const app = express();

app.use(cors({origin:process.env.CLIENT_URL, credentials: true}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute)
app.use('/api/test', testRoute)
app.use('/api/users', UserRoute)
app.use('/api/posts', PostRoute)

app.listen(6969, () => {
    console.log("Server is running on port 6969");
})
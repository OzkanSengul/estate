import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

const PORT = 3000 || process.env.PORT;
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

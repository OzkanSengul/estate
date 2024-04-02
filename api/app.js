import express from "express";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";

const PORT = 3000 || process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

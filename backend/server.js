import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import cors from "cors";
import connectMongoDB from "./db/connectMongoDB.js";
const app = express();
dotenv.config();


cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

app.use(cors({
	origin : "http://localhost:3000",
	credentials : true
}))

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" })); 
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cookieParser());
app.use(express.urlencoded({
	extended : true
}))
app.get("/api/auth/user", (req, res) => {
    res.json({ username: "john_doe", fullName: "John Doe", profileImg: "/avatar-placeholder.png" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	app.use("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongoDB();
});

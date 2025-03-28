import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import referralPostRoute from "./routes/referralpost.route.js";
import applicationRoute from "./routes/application.route.js";
dotenv.config({});

const app = express();

// app.use(express.json());
app.use(express.json({ limit: "50mb" })); // Increase limit
app.use(express.urlencoded({extended:true, limit: "50mb" }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/referralpost", referralPostRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server running at port: ${PORT}`);
})
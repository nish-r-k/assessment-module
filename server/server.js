import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
//import authRoutes from "./routes/authRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import applicantRoutes from "./routes/applicantRoutes.js"

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/assessments", assessmentRoutes);
//app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/applicants", applicantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


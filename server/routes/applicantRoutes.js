import express from "express";
import { getApplicantCount, loginApplicant, registerApplicant } from "../controllers/applicantController.js";

const router = express.Router();

router.post("/register", registerApplicant);
router.post("/login", loginApplicant);
router.get("/count", getApplicantCount);

export default router;

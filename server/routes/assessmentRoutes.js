import express from "express";
import { bulkUpload, createAssessment, deleteAssessment, getAllAssessments, getAssessmentById } from "../controllers/assessmentController.js";

const router = express.Router();

router.post("/",  createAssessment);
 router.get("/",  getAllAssessments);
 router.get("/:id",  getAssessmentById);
 
router.delete("/:id",  deleteAssessment);
router.post("/bulk-upload",  bulkUpload);

export default router;
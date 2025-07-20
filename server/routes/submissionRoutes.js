import express from 'express';
import { getResultById, submitAssessment } from '../controllers/submissionController.js';

const router = express.Router();


router.post('/submit', submitAssessment);
router.get('/:resultId', getResultById)

export default router;

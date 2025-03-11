const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const authMiddleware = require('../middleware/authMiddleware');  

const { createExperienceValidators, updateExperienceValidators, deleteExperienceValidators } = experienceController;


router.get('/', experienceController.getAllExperiences);


router.get('/active', experienceController.getActiveExperiences);


router.post('/', authMiddleware, createExperienceValidators, experienceController.createExperience);


router.put('/:id', authMiddleware, updateExperienceValidators, experienceController.updateExperience);


router.delete('/:id', authMiddleware, deleteExperienceValidators, experienceController.deleteExperience);

module.exports = router;

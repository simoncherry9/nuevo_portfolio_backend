const express = require('express');
const router = express.Router();
const studyController = require('../controllers/estudiosController');
const authMiddleware = require('../middleware/authMiddleware');
const { createStudyValidators, updateStudyValidators, deleteStudyValidators, getStudyByIdValidators } = require('../controllers/estudiosController');

router.get('/', studyController.getAllStudies);
router.get('/active', studyController.getActiveStudies);
router.post('/', authMiddleware, createStudyValidators, studyController.createStudy);
router.put('/:id', authMiddleware, updateStudyValidators, studyController.updateStudy);
router.delete('/:id', authMiddleware, deleteStudyValidators, studyController.deleteStudy);
router.get('/:id', getStudyByIdValidators, studyController.getStudyById);

module.exports = router;
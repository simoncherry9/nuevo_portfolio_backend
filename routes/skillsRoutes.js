const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');
const authMiddleware = require('../middleware/authMiddleware');
const { createSkillValidators, updateSkillValidators, deleteSkillValidators } = require('../controllers/skillsController');  


router.get('/active', skillsController.getAllActiveSkills);


router.get('/', skillsController.getAllSkills);


router.post('/', authMiddleware, createSkillValidators, skillsController.createSkill);


router.put('/:id', authMiddleware, updateSkillValidators, skillsController.updateSkill);


router.delete('/:id', authMiddleware, deleteSkillValidators, skillsController.deleteSkill);

module.exports = router;

const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');
const authMiddleware = require('../middleware/authMiddleware');
const { createSkillValidators, updateSkillValidators, deleteSkillValidators } = require('../controllers/skillsController');  // Importar las validaciones

// **Obtener todas las habilidades (GET) - Pública**
router.get('/', skillsController.getAllSkills);

// **Crear una nueva habilidad (POST) - Protegida por autenticación y validación de entrada**
router.post('/', authMiddleware, createSkillValidators, skillsController.createSkill);

// **Actualizar una habilidad (PUT) - Protegida por autenticación y validación de entrada**
router.put('/:id', authMiddleware, updateSkillValidators, skillsController.updateSkill);

// **Eliminar una habilidad (DELETE) - Protegida por autenticación y validación de entrada**
router.delete('/:id', authMiddleware, deleteSkillValidators, skillsController.deleteSkill);

module.exports = router;

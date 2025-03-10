const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todas las habilidades (GET) - Pública
router.get('/', skillsController.getAllSkills);

// Crear una nueva habilidad (POST) - Protegida
router.post('/', authMiddleware, skillsController.createSkill);

// Actualizar una habilidad (PUT) - Protegida
router.put('/:id', authMiddleware, skillsController.updateSkill);

// Eliminar una habilidad (DELETE) - Protegida
router.delete('/:id', authMiddleware, skillsController.deleteSkill);

module.exports = router;

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const { createProfileValidators, updateProfileValidators, deleteProfileValidators } = require('../controllers/profileController');

router.get('/', profileController.getAllProfiles);

router.post('/', authMiddleware, createProfileValidators, profileController.createProfile);

router.put('/:id', authMiddleware, updateProfileValidators, profileController.updateProfile);

router.delete('/:id', authMiddleware, deleteProfileValidators, profileController.deleteProfile);

router.get('/:id', profileController.getProfileById);

module.exports = router;

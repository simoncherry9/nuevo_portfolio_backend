const express = require('express');
const router = express.Router();
const socialLinksController = require('../controllers/sociallinksController');
const authMiddleware = require('../middleware/authMiddleware');
const { createSocialLinkValidators, updateSocialLinkValidators, deleteSocialLinkValidators } = require('../controllers/sociallinksController');  


router.get('/', socialLinksController.getAllSocialLinks);


router.post('/', authMiddleware, createSocialLinkValidators, socialLinksController.createSocialLink);


router.put('/:id', authMiddleware, updateSocialLinkValidators, socialLinksController.updateSocialLink);


router.delete('/:id', authMiddleware, deleteSocialLinkValidators, socialLinksController.deleteSocialLink);

module.exports = router;

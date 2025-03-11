const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');  


const { createImageValidators, updateImageValidators, deleteImageValidators } = require('../controllers/galleryController');


router.get('/', galleryController.getAllImages);


router.get('/active', galleryController.getActiveImages);  


router.post('/', authMiddleware, createImageValidators, galleryController.createImage);


router.put('/:id', authMiddleware, updateImageValidators, galleryController.updateImage);


router.delete('/:id', authMiddleware, deleteImageValidators, galleryController.deleteImage);

module.exports = router;

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');  


const { createContactMessageValidators, updateContactMessageValidators, deleteContactMessageValidators } = require('../controllers/contactController');


router.get('/', authMiddleware, contactController.getAllContactMessages);


router.post('/', authMiddleware, createContactMessageValidators, contactController.createContactMessage);


router.put('/:id', authMiddleware, updateContactMessageValidators, contactController.updateContactMessage);


router.delete('/:id', authMiddleware, deleteContactMessageValidators, contactController.deleteContactMessage);

module.exports = router;

const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const authMiddleware = require('../middleware/authMiddleware');

const { createCertificateValidators, updateCertificateValidators, deleteCertificateValidators } = certificateController;

router.get('/', certificateController.getAllCertificates);

router.get('/active', certificateController.getActiveCertificates);

router.post('/', authMiddleware, createCertificateValidators, certificateController.createCertificate);

router.put('/:id', authMiddleware, updateCertificateValidators, certificateController.updateCertificate);

router.delete('/:id', authMiddleware, deleteCertificateValidators, certificateController.deleteCertificate);

router.get('/:id', certificateController.getCertificateByIdValidators, certificateController.getCertificateById);

module.exports = router;

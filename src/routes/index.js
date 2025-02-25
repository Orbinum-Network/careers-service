const express = require('express');
const multer = require("multer");
const router = express.Router();
const careerController = require('../controllers/careers');
const careerValidationRules = require('../validators/careers');
const applicationController = require('../controllers/applications');

const upload = multer();

router.get('/', careerController.getAllCareers);
router.get('/:id', careerController.getCareerById);
router.post('/', careerValidationRules, careerController.createCareer);
router.put('/:id', careerValidationRules, careerController.updateCareer);
router.delete('/:id', careerController.deleteCareer);
router.post('/apply', upload.single("resume"), applicationController.receiveApplication);
router.get('/applications', applicationController.getAllApplications);

module.exports = router;
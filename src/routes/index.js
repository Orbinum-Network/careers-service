const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careers');
const careerValidationRules = require('../validators/careers');

router.get('/', careerController.getAllCareers);
router.get('/:id', careerController.getCareerById);
router.post('/', careerValidationRules, careerController.createCareer);
router.put('/:id', careerValidationRules, careerController.updateCareer);
router.delete('/:id', careerController.deleteCareer);

module.exports = router;
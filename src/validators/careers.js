const { body } = require("express-validator");

const careerValidationRules = [
    body("title").notEmpty().withMessage("El título es obligatorio"),
    body("location").notEmpty().withMessage("La ubicación es obligatoria"),
    body("employment_type")
        .isIn(["Full Time", "Part Time", "Freelance"])
        .withMessage("El tipo de empleo debe ser Full Time, Part Time o Freelance"),
    body("department").notEmpty().withMessage("El departamento es obligatorio"),
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    body("state")
        .isIn(['FINISHED', 'CANCELLED', 'ACTIVE'])
        .withMessage("El estado debe ser uno de los siguientes: FINISHED, CANCELLED, ACTIVE")
];

module.exports = careerValidationRules;
const { body } = require("express-validator");

const careerValidationRules = [
    body("title").notEmpty().withMessage("El título es obligatorio"),
    body("location").notEmpty().withMessage("La ubicación es obligatoria"),
    body("employment_type")
        .isIn(["FULL TIME", "PART TIME", "FREELANCE"])
        .withMessage("El tipo de empleo debe ser FULL TIME, PART TIME o FREELANCE"),
    body("department").notEmpty().withMessage("El departamento es obligatorio"),
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    body("state")
        .isIn(['FINISHED', 'CANCELLED', 'ACTIVE'])
        .withMessage("El estado debe ser uno de los siguientes: FINISHED, CANCELLED, ACTIVE")
];

module.exports = careerValidationRules;
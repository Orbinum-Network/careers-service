const { body } = require("express-validator");

const careerValidationRules = [
    body("title").notEmpty().withMessage("Title is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("employment_type")
        .isIn(["Full Time", "Part Time", "Freelance"])
        .withMessage("Employment type must be Full Time, Part Time, or Freelance"),
    body("department").notEmpty().withMessage("Department is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("state")
        .isIn(['FINISHED', 'CANCELLED', 'ACTIVE'])
        .withMessage("State must be one of the following: FINISHED, CANCELLED, ACTIVE"),
    body("requirements")
        .isArray({ min: 1 })
        .withMessage("Requirements must be an array with at least one item"),
    body("requirements.*")
        .isString()
        .notEmpty()
        .withMessage("Each requirement must be a valid non-empty string")
];

module.exports = careerValidationRules;
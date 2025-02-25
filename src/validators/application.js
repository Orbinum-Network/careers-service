const { body } = require("express-validator");

const applicationValidationRules = [
    body("career_id").notEmpty().withMessage("career_id is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("linkedIn").optional().isURL().withMessage("Invalid LinkedIn URL"),
    body("website").optional().isURL().withMessage("Invalid website URL"),
    body("github").optional().isURL().withMessage("Invalid GitHub URL"),
];

module.exports = { applicationValidationRules };
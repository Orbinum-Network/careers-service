const { validationResult } = require("express-validator");
const { sendApplicationEmail } = require("../services/application.js");

const receiveApplication = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, linkedIn, website, github } = req.body;
        const resume = req.file;

        const response = await sendApplicationEmail({ name, email, linkedIn, website, github, resume });
        if (response.success) {
            return res.status(200).json({
                message: "Application received and email sent successfully",
            });
        } else {
            return res.status(500).json({ error: "Failed to send email" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    receiveApplication,
};

const { validationResult } = require("express-validator");
const applicationService = require("../services/applications");

const receiveApplication = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { career_id, name, email, linkedIn, website, github } = req.body;
        const resume = req.file;
        const clientIpAddress = req.clientIpAddress;

        const result = await applicationService.getApplicationByUserIp(clientIpAddress, career_id);
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                message: "You have already applied before and cannot apply again.",
            });
        }

        await applicationService.registerClientApplication(clientIpAddress, career_id);

        const response = await applicationService.sendApplicationEmail({ name, email, linkedIn, website, github, resume });
        if (response.success) {
            return res.status(200).json({
                success: true,
                message: "Application received and email sent successfully.",
            });
        } else {
            return res.status(500).json({ error: "Error sending confirmation email." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllApplications = async (req, res) => {
    try {
        const applications = await applicationService.getAllApplications();
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    receiveApplication,
    getAllApplications,
};
const { EMAIL_USER } = require('../config/envs');
const appyLogger = require('../utils/appyLogger');
const transporter = require('../utils/transporter');

const sendApplicationEmail = async ({ name, email, linkedIn, website, github, resume }) => {
    try {
        const response = await transporter.sendMail({
            from: EMAIL_USER,
            to: EMAIL_USER,
            subject: "New Job Application",
            text: `Name: ${name}\nEmail: ${email}\nLinkedIn: ${linkedIn}\nWebsite: ${website}\nGitHub: ${github}`,
            attachments: resume
                ? [{ filename: resume.originalname, content: resume.buffer }]
                : [],
        });

        if (response.messageId) {
            return { success: true, messageId: response.messageId };
        } else {
            appyLogger(`Email sending failed: No messageId returned.`);
            throw new Error("Email sending failed: No messageId returned.");
        }
    } catch (error) {
        appyLogger(`Error sending email: ${error.message}`);
        throw new Error(`Error sending email: ${error.message}`);
    }
};

module.exports = { sendApplicationEmail };
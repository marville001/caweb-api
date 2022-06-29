const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/sendEmail");

module.exports = {
    contactController: catchAsync(async (req, res) => {
        const { email, firstname, lastname, message, subject } = req.body;
        // Send email to create passowrd
        await sendEmail({
            to: "paulbrian254@gmail.com",
            from: `Dekut Catholic Chaplaincy <${process.env.FROM_EMAIL}>`,
            subject: "You Nave a New Message! - " + subject,
            html: `
            <p><strong>${firstname} ${lastname} </strong> (${email}) sent a message <i>${message}</i>. (Receiver of contacts to be changed)</p>`,
        });

        res.send({
            success: true,
            message: "Message sent successfully.",
        });
    }),
};

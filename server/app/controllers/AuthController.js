const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");
const { stringTrim, requiredError } = require("../../helpers/helper");
const User = require("../models/UserModel");
const authController = {}

authController.create = async (req, res) => {
    const body = req.body;
    try {
        stringTrim(body)
        requiredError({requiredFields:['name', 'email', 'mobile', 'password', 'role'] , body})
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).json({
                message: `User with email ${body.email} already exists`
            });
        }
        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
        // Create the user
        const createdUser = await User.create(body);
        return res.status(200).json({
            message: "User is created",
            data: createdUser
        });

    } catch (err) {
        return res.status(400).json({
            message: "User can't be created",
            error: err
        });
    }
}

authController.login = async (req, res) => {
    const body = req.body;

    try {
        requiredError({requiredFields: ['email', 'password'], body})
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            const match = await bcrypt.compare(body.password, existingUser.password);

            if (match) {
                const tokenData = {
                    _id: existingUser._id,
                    email: existingUser.email,
                    role: existingUser.role,
                };
                const token = jwt.sign(tokenData, process.env.JWT_Verify, { expiresIn: "1d" })
                if (token) {
                    return res.status(200).json({ token: `Bearer ${token}`, message: "Login successfully", });
                } else {
                    return res.status(400).json({
                        message: `Something went wronge in create token`
                    });
                }

            } else {
                return res.status(400).json({
                    message: `Incorrect password or email`
                });
            }
        } else {
            return res.status(400).json({
                message: `User with email ${body.email} not exists`
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "Can't be login, please try again",
            error: err
        });
    }
}

authController.forgotPassword = async (req, res) => {
    const email = req.body?.email

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                message: "Can't user is not exist, please try again",
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your preferred email service
            auth: {
                user: 'suriyajagan25@gmail.com',
                pass: 'iaqq dblp vhus jzux',
            },
        });
        const template = fs.readFileSync(path.join(__dirname, 'resetPasswordTemplate.html'), 'utf8');

        function populateTemplate(username, resetLink) {
            return template
                .replace(/{{username}}/g, username)
                .replace(/{{resetLink}}/g, resetLink);
        }

        const token = jwt.sign({ userId: user._id }, "forgotPassword", { expiresIn: "1h" });
        const resetLink = `http://localhost:5173/resetPassword?token=${token}`;

        const htmlContent = populateTemplate(user.name, resetLink);
        const mailOptions = {
            from: "suriyajagan25@gmail.com",
            to: user?.email,
            subject: 'Password Reset Request',
            html: htmlContent,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({
                    message: "Can't sent mail, please try again",
                    error: error
                });
            }
            return res.status(200).json({
                message: 'Password reset email sent successfully!',
                info: info.response
            });
        });

    } catch (error) {
        return res.status(400).json({
            message: "An unexpected error occurred, please try again",
            error: error
        });
    }
}

authController.resetPassword = async (req, res) => {
    const body = req.body
    const _id = req.params.id
    try {
        if (!body?.password) {
            return res.status(400).json({
                message: 'Password is required!',
            });
        }
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
        const updateUser = await User.findOneAndUpdate({ _id }, { password: body?.password }, { new: true, runValidators: true })
        if (updateUser) {
            return res.status(400).json({
                data: updateUser,
                message: "Successfully updated password",
            });
        } else {
            return res.status(400).json({
                message: "User is not exist, please try again",
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: "An unexpected error occurred, please try again",
            error: error
        });
    }
}


module.exports = authController
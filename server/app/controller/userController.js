const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const userController = {}
const jwt = require("jsonwebtoken")


userController.create = async (req, res) => {
    const body = req.body;
    try {
        Object.keys(body).forEach(key => {
            if (typeof body[key] === 'string') {
                body[key] = body[key].trim();
            }
        });

        // Remove `createdBy` if it's an empty string
        if (body.createdBy === "") {
            delete body.createdBy;
        }

        // Validate required fields
        const requiredFields = ['name', 'email', 'mobile', 'password', 'role'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return res.status(400).json({
                    message: `${field} is required`
                });
            }
        }

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

userController.login = async (req, res) => {
    const body = req.body;

    try {
        const requiredFields = ['email', 'password'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return res.status(400).json({
                    message: `${field} is required`
                });
            }
        }
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

userController.list = async (req, res) => {
    const limit = req.params.limit
    const offset = req.params.offset
    try {
        // listing all users
        const listAlluser = await User.find();
        return res.status(200).json({
            message: "Successfully listing all users",
            data: listAlluser
        });

    } catch (err) {
        return res.status(400).json({
            message: "Can't be listing all users",
            error: err
        });
    }
}

module.exports = userController
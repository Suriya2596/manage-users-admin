

const userController = {}
const User = require("../models/UserModel");

userController.getLoggedUser = async (req, res) => {
    const user = req.user;
    try {
        if (user) {
            return res.status(200).json({ data: user, message: "Successfully get User details", });
        } else {
            return res.status(400).json({
                message: `User is not exists`
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "Can't get user, please try again",
            error: err
        });
    }
}

userController.getAllusers = async (req, res) => {
    try {
        const Users = await User.find()
        if (Users) {
            return res.status(200).json({ data: Users, message: "Successfully get all User", });
        } else {
            return res.status(400).json({
                message: `can't get exists`
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "Can't get user, please try again",
            error: err
        });
    }
}

module.exports = userController
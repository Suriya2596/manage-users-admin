

const userController = {}
const { requiredError } = require("../../helpers/helper");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt")

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


userController.getUserbyId = async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById({ _id: _id })
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


userController.updateById = async (req, res) => {
    const _id = req.params.id
    const body = req.body
    try {
        const user = await User.findById({ _id: _id })
        if (user) {
            delete body?.password
            const updateUser = await User.findByIdAndUpdate({ _id: _id }, body, { new: true, runValidators: true })
            if (!updateUser) {
                return res.status(400).json({
                    message: `User is can't be update`
                });
            }
            return res.status(200).json({ data: updateUser, message: "Successfully updated User details", });
        } else {
            return res.status(400).json({
                message: `User is not exists`
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "Can't updated user, please try again",
            error: err
        });
    }
}

userController.deleteUser = async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById({ _id: _id })
        if (user) {
            const deleteUser = await User.findOneAndDelete({ _id: _id })
            if (!deleteUser) {
                return res.status(400).json({
                    message: `User is can't be delete`
                });
            }
            return res.status(200).json({ data: deleteUser._id, message: "Successfully delete User details", });
        } else {
            return res.status(400).json({
                message: `User is not exists`
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "Can't delete user, please try again",
            error: err
        });
    }
}

userController.changePassword = async (req, res) => {
    const body = req.body
    const _id = req.params.id
    try {
        const user = await User.findById({ _id, _id })
        if (!user) {
            return res.status(400).json({
                message: "User is not exist, please try again",
            });
        }
        requiredError({ requiredFields: ["newPassword", "oldPassword"], body: body })
        const match = await bcrypt.compare(body.oldPassword, user.password);
        if (!match) {
            return res.status(400).json({
                message: "Current Password is not matching, please try again",
            });
        }
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.newPassword, salt);
        const updateUser = await User.findOneAndUpdate({ _id }, { password: body?.password }, { new: true, runValidators: true })
        if (updateUser) {
            return res.status(200).json({
                data: updateUser?._id,
                message: "Successfully updated password",
            });
        } else {
            return res.status(400).json({
                message: "Can't updated the user, please try again",
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: "An unexpected error occurred, please try again",
            error: error
        });
    }
}


module.exports = userController
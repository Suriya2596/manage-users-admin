const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const userController = {}

userController.create = (req, res) => {
    const body = req.body

    if (!body?.name) {
        return res.status(400).json({
            message: "Name is required"
        })
    }

    if (!body?.email) {
        return res.status(400).json({
            message: "Name is required"
        })
    }

    if (!body?.mobile) {
        return res.status(400).json({
            message: "Name is required"
        })
    }

    if (!body?.password) {
        return res.status(400).json({
            message: "Name is required"
        })
    }

    if (!body?.role) {
        return res.status(400).json({
            message: "Role is required"
        })
    }

    User.findOne({ email: body?.email })
        .then((checkUser) => {
            if (!checkUser) {
                bcrypt.genSalt(10)
                    .then((salt) => {
                        bcrypt.hash(body?.password, salt)
                            .then((encryptPassword) => {
                                body.password = encryptPassword;
                                User.create(body)
                                    .then((createdUser) => {
                                        return res.status(200).json({
                                            message: "User is created",
                                            data: createdUser
                                        })
                                    })
                                    .catch((err) => {
                                        res.status(400).json({
                                            message: "User can't be create",
                                            error: err
                                        })
                                    })
                            })
                            .catch((err) => {
                                res.status(400).json({
                                    message: "Error in password encrypt",
                                    error: err
                                })
                            })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: "Error in password bcrypt",
                            error: err
                        })
                    })
            } else {
                return res.status(400).json({
                    message: `User is ${checkUser?.email || ""} already exit`
                })

            }
        })
        .catch((err) => {
            res.status(400).json({
                message: "User can't be create",
                error: err
            })
        })

}

module.exports = userController
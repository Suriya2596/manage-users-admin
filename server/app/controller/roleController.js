const Role = require("../model/roleModel")

const roleController = {}

roleController.create = (req, res) => {
    const { roleType, title } = req.body;

    Role.findOne({ roleType: roleType })
        .then((result) => {
            if (result) {
                res.status(400).json({
                    message: "Role type is already created, please try again"
                });
            } else {
                Role.create({ roleType, title })
                    .then((result) => {
                        res.status(200).json({
                            data: result,
                            message: "Successfully created role"
                        });
                    })
                    .catch((err) => {
                        res.status(400).json({
                            error: err,
                            message: "Role can't be created, please try again"
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
                message: "Role can't be created, please try again"
            });
        });
}


roleController.get = (req, res) => {
    Role.find()
        .then((role) => {
            if (role) {
                res.status(200).json({
                    data: role,
                    message: "Successfull get all roles"
                })
            } else {
                res.status(400).json({
                    message: "Role can't create,please try again"
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
                message: "Can't get role,please try again"
            })
        })
}

module.exports = roleController
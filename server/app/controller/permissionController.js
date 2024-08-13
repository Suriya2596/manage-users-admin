const Permission = require("../model/permissionModel")


const permissionController = {}

permissionController.create = (req, res) => {
    const { lable, title, read, write, update } = req.body
    Permission.create({ lable, title, read, write, update })
        .then((createData) => {
            res.status(200).json({
                data: createData,
                message: "Successfully cretae"
            })
        }).catch((err) => {
            res.status(400).json({
                error:err,
                message: "Permission data can't cretae"
            })
        })
}

permissionController.get = (req, res) => {
    Permission.find()
        .then((alldatas) => {
            res.status(200).json({
                data: alldatas,
                message: "Successfully cretae"
            })
        }).catch((err) => {
            res.status(400).json({
                error:err,
                message: "Can't get the permission data"
            })
        })
}


module.exports = permissionController
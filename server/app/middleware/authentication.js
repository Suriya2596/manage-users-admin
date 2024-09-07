const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")


const authentication = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1]
    try {
        const tokenData = jwt.verify(token, process.env.JWT_Verify)
        if (tokenData) {
            User.findOne({ _id: tokenData._id })
                .then((user) => {
                    if (user) {
                        req.user = user
                        next()
                    } else {
                        res.status(401).json({
                            message: "User is Not found",
                        })
                    }
                })
        } else {
            res.status(401).json({
                message: "Invalidate Token"
            })
        }

    } catch (error) {
        res.status(401).json({
            message: "Invalidate Token",
            error: error
        })
    }
}


module.exports = {
    authentication
}
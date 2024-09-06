const jwt = require("jsonwebtoken")
const User = require("../model/userModel")

const authentication = async (req, res, next) => {
    const barerToken = req.header("Authorization")
    let token;
    if (barerToken) {
        token = req.header("Authorization").split(" ")[1]
        try {
            const tokenData = jwt.verify(token, process.env.JWT_Verify)
            if (tokenData) {
                const user = await User.findOne({ _id: tokenData._id })
                if (user) {
                    req.user = user
                    next()
                } else {
                    res.status(401).json({
                        message: "User is Not found",
                    })
                }
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
    }else{
        res.status(401).json({
            message: "Invalidate Token,Please send token",
        })
    }

}

const authorization = (req, res, next) => {
    User.findOne({ _id: req._id })
        .then((user) => {
            if (user) {
                if (user.role === "admin") {
                    next()
                } else {
                    res.status(401).json({
                        message: "You are not allowed to access"
                    })
                }
            } else {
                res.status(401).json({
                    message: "User is not found"
                })
            }
        })
        .catch((err) => {
            res.json(err)
        })
}


module.exports = {
    authentication, authorization
}
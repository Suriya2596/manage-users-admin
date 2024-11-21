const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")


const authentication = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    try {
        const tokenData = jwt.verify(token, process.env.JWT_Verify);

        if (tokenData) {
            // let user = await User.findOne({ _id: tokenData._id }).populate("role");

            const user = await User.findOne({ _id: tokenData._id }).populate([
                { path: "role" }, // Populate the `role` field
                { path: "createdBy", select: "_id name email" }, // Populate `createdBy` and select specific fields
            ]);

            if (user) {
                // if (user.createdBy) {
                //     user = await User.populate(user, { path: "createdBy", select: "_id name email" });
                // }

                req.user = user;
                next();
            } else {
                return res.status(401).json({
                    message: "User is not found",
                });
            }
        } else {
            return res.status(401).json({
                message: "Invalid Token",
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token",
            error: error.message,
        });
    }
};

const authorization = async (req, res, next) => {
    const loggedUser = req.user
    try {
        if (loggedUser.role && (loggedUser.role?.roleType === "SA" || loggedUser.role?.roleType === "A")) {
            next()
        }
    } catch (error) {
        return res.status(401).json({
            message: "Access to this request is denied",
            error: error.message,
        });
    }
};

const adminAuthorization = async (req, res, next) => {
    const loggedUser = req.user
    try {
        if (loggedUser.role && (loggedUser.role?.roleType === "A")) {
            next()
        }
    } catch (error) {
        return res.status(401).json({
            message: "Access to this request is denied",
            error: error.message,
        });
    }
};

const superAdminAuthorization = async (req, res, next) => {
    const loggedUser = req.user
    try {
        if (loggedUser.role && (loggedUser.role?.roleType === "A")) {
            next()
        }
    } catch (error) {
        return res.status(401).json({
            message: "Access to this request is denied",
            error: error.message,
        });
    }
};



module.exports = {
    authentication,
    authorization,
    adminAuthorization,
    superAdminAuthorization
}
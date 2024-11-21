
let adminController = {}
const User = require("../models/UserModel");



adminController.adminGetUser = async (req, res) => {
    const loggedUser = req.user;
    try {
        // Query users where `createdBy` matches the loggedUser's `_id` and roleType is "U"
        const users = await User.find({ 
            createdBy: loggedUser._id, 
        }).populate({
            path: 'role',
            match: { roleType: "U" }
        });

        // Filter out users where the role does not match (populate can return null for unmatched roles)
        const filteredUsers = users.filter(user => user.role !== null);

        if (filteredUsers.length === 0) {
            return res.status(404).json({
                message: "No users found created by the logged-in user with roleType 'U'.",
            });
        }

        // Return the filtered list of users
        return res.status(200).json({
            message: "Users fetched successfully",
            users: filteredUsers,
            totalCount: filteredUsers.length
        });
    } catch (err) {
        return res.status(400).json({
            message: "Can't get user, please try again",
            error: err
        });
    }
}

adminController.adminGetAdmin = async (req, res) => {
    const loggedUser = req.user;
    try {
        // Query users where `createdBy` matches the loggedUser's `_id` and roleType is "U"
        const users = await User.find({ 
            createdBy: loggedUser._id, 
        }).populate({
            path: 'role',
            match: { roleType: { $in: ["A", "SA"] } }
        });

        // Filter out users where the role does not match (populate can return null for unmatched roles)
        const filteredUsers = users.filter(user => user.role !== null);

        if (filteredUsers.length === 0) {
            return res.status(404).json({
                message: "No users found created by the logged-in user with roleType 'U'.",
            });
        }

        // Return the filtered list of users
        return res.status(200).json({
            message: "Users fetched successfully",
            users: filteredUsers,
            totalCount: filteredUsers.length
        });
    } catch (err) {
        return res.status(400).json({
            message: "Can't get user, please try again",
            error: err
        });
    }
}

adminController.adminGetUserAdmin = async (req, res) => {
    const loggedUser = req.user;
    try {
        // Query users where `createdBy` matches the loggedUser's `_id` and roleType is "U"
        const users = await User.find({ 
            createdBy: loggedUser._id, 
        }).populate({
            path: 'role',
            match: { roleType: { $in: ["A", "SA","U"] } }
        });

        // Filter out users where the role does not match (populate can return null for unmatched roles)
        const filteredUsers = users.filter(user => user.role !== null);

        if (filteredUsers.length === 0) {
            return res.status(404).json({
                message: "No users found created by the logged-in user with roleType 'U'.",
            });
        }

        // Return the filtered list of users
        return res.status(200).json({
            message: "Users fetched successfully",
            users: filteredUsers,
            totalCount: filteredUsers.length
        });
    } catch (err) {
        return res.status(400).json({
            message: "Can't get user, please try again",
            error: err
        });
    }
}

module.exports = adminController

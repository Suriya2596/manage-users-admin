const express = require("express")
const roleController = require("../app/controllers/RoleController")
const authController = require("../app/controllers/AuthController")
const userController = require("../app/controllers/UserController")
const { authentication, authorization } = require("../app/middleware/Authentication")
const adminController = require("../app/controllers/AdminController")
const routes = express.Router()

// role
routes.post("/role", authentication, roleController.create)
routes.get("/role", authentication, roleController.get)
routes.patch("/role/:id", authentication, roleController.update)
routes.delete("/role/:id", authentication, roleController.destroy)

// auth
routes.post("/user", authController.create)
routes.post("/login", authController.login)
routes.post("/forgot-password", authController.forgotPassword)
routes.post("/reset-password/:token", authController.resetPassword)

// user
routes.get("/user", authentication, userController.getLoggedUser)
routes.get("/user-list", authentication, userController.getAllusers)
routes.get("/user/:id", authentication, userController.getUserbyId)
routes.patch("/user/:id", authentication, userController.updateById)
routes.delete("/user/:id", authentication, userController.deleteUser)
routes.patch("/user/change-password/:id", authentication, userController.changePassword)

// admin
routes.get("/admin/getUser", authentication, authorization, adminController.adminGetUser)
routes.get("/admin/getAdmin", authentication, authorization, adminController.adminGetAdmin)
routes.get("/admin/getUserAdmin", authentication, authorization, adminController.adminGetUserAdmin)

module.exports = routes
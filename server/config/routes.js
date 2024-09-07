const express = require("express")
const roleController = require("../app/controllers/RoleController")
const authController = require("../app/controllers/AuthController")
const userController = require("../app/controllers/UserController")
const { authentication } = require("../app/middleware/Authentication")
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
routes.post("/reset-password/:id", authController.resetPassword)

// user
routes.get("/user", authentication, userController.getLoggedUser)
routes.get("/user-list", authentication, userController.getAllusers)

module.exports = routes
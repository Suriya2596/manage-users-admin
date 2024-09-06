const express = require("express")
const routes = express.Router()

const roleController = require("../app/controller/RoleController");
const userController = require("../app/controller/userController");
const { authentication } = require("../app/middleware/authentication");

routes.post("/role", roleController.create)
routes.get("/role", roleController.get)
routes.patch("/role/:id", roleController.update)
routes.delete("/role/:id", roleController.destroy)


routes.post("/user", userController.create)
routes.post("/user/login", userController.login)
routes.get("/user/list", authentication, userController.list)

module.exports = routes
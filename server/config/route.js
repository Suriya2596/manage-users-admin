const express = require("express")
const routes = express.Router()

const roleController = require("../app/controller/RoleController");
const permissionController = require("../app/controller/permissionController");
const userController = require("../app/controller/userController");

routes.post("/role", roleController.create)
routes.get("/role", roleController.get)

routes.post("/permission", permissionController.create)
routes.get("/permission", permissionController.get)

routes.post("/user", userController.create)

module.exports = routes
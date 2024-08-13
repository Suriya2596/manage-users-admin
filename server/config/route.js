const express = require("express")
const routes = express.Router()

const roleController = require("../app/controller/RoleController");
const permissionController = require("../app/controller/permissionController");

routes.post("/role", roleController.create)
routes.get("/role", roleController.get)

routes.post("/permission", permissionController.create)
routes.get("/permission", permissionController.get)


module.exports = routes
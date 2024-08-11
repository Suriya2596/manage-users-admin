const express = require("express")
const routes = express.Router()

const roleController = require("../app/controller/RoleController");

routes.post("/role", roleController.create)
routes.get("/role", roleController.get)


module.exports = routes
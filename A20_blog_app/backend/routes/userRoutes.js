const express = require("express");
const route = express.Router();
const { postLogic , validationLogic } = require("../controllers/userLogic")

route.post("/addUser", postLogic);
route.get("/validation", validationLogic); // Changed from findUser to validation

module.exports = route;
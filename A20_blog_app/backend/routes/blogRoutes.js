const express = require("express");
const route = express.Router();
const { postLogic, getLogic, getOneLogic, deleteLogic } = require("../controllers/blogLogic")

route.post("/add", postLogic);
route.get("/viewBlogs", getLogic);
route.get("/getBlog", getOneLogic);
route.delete("/remove", deleteLogic);

module.exports = route;
const express = require("express");
const auth = require("./auth.routes.js");
const user = require("./user.routes.js");
const authorization = require("./authorization.routes.js");
const routes = express.Router();

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/authorization", authorization);

module.exports = routes;

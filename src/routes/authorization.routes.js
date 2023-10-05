const AuthorizationController = require("../controllers/AuthorizationController");
const AuthorizationService = require("../services/AuthorizationService");
const Authorization = require("../models/authorization.model");
const UserService = require("../services/UserService");
const User = require("../models/user.model");
const userService = new UserService(User);

const authorizationService = new AuthorizationService(Authorization);
const authorizationController = new AuthorizationController(
  authorizationService,
  userService
);

var routes = require("express").Router();

routes.post("/add", authorizationController.add);
routes.post("/update/:id", authorizationController.update);
routes.post("/get", authorizationController.getAuthorization);

module.exports = routes;

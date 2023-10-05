const UserController = require("../controllers/UserController");
const UserService = require("../services/UserService");
const User = require("../models/user.model");
const Asset = require("../models/asset.model");
const userService = new UserService(User, Asset);
const userController = new UserController(userService);

var routes = require("express").Router();

routes.get(
  "/",
  userController.search
);
routes.post(
    "/images",
    userController.getImages
  );
routes.post(
    "/asset",
    userController.addAsset
  );
  routes.post(
    "/asset/get",
    userController.getAssets
  );
  routes.post(
    "/asset/get/authorized",
    userController.getAuthorizedAssets
  );
  routes.post(
    "/asset/get/all",
    userController.getAllAssets
  );
module.exports = routes;

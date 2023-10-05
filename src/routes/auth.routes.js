const AuthController = require("../controllers/AuthController");
const AuthService = require("../services/AuthService");
const User = require("../models/user.model");
const authService = new AuthService(User);
const authController = new AuthController(authService);

var routes = require("express").Router();

const AuthValidator = require("../validators/AuthValidator");
const authValidator = new AuthValidator();
const validate = require("../middlewares/validate.middleware");
const fileUpload = require("../middlewares/images-upload.middleware");

/**
 *  @swagger
 *  tags:
 *      name: Authentication
 *      description: All requests related to authentication
 */

/**
 *  @swagger
 *  /api/auth/login:
 *      post:
 *          tags: [Authentication]
 *          description: Login User with Email and Password
 *          parameters:
 *            - name: username
 *              description: Username of the user
 *              in: formData
 *              required: true
 *              type: string
 *            - name: images
 *              description: User Images
 *              in: formData
 *              required: true
 *              type: file[]
 *          responses:
 *              200:
 *                  description: A successful response
 *              401:
 *                  description: Authentication failed
 *              500:
 *                  description: Some error occurred while logging in.
 */
routes.post(
  "/login",
  validate(authValidator.loginSchema),
  authController.login
);
/**
 *  @swagger
 *  /api/auth/signup:
 *      post:
 *          tags: [Authentication]
 *          description: User Signup
 *          parameters:
 *            - name: username
 *              description: Email of the user
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: A successful response
 *              401:
 *                  description: Authentication failed
 *              500:
 *                  description: Some error occurred while logging in.
 */
routes.post(
  "/signup",
  fileUpload("uploads/images").any(),
  validate(authValidator.signupSchema),
  authController.signup
);

routes.post(
  "/verify",
  fileUpload("uploads/temp").any(),
  authController.checkUserImage
);

routes.post(
  "/verify-video",
  fileUpload("uploads/videos").any(),
  (req, res, next) => {
    req.isVideos = true;
    next();
  },
  authController.checkUserImage
);

routes.post(
  "/gesture",
  fileUpload("uploads/temp").any(),
  authController.checkUserGesture
);

routes.post(
  "/3d-model",
  fileUpload("uploads/3d").any(),
  authController.send3dModel
);

module.exports = routes;

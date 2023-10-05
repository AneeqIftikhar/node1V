class AuthController {
  constructor(authService) {
    this._authService = authService;
    this._axios = require("axios");
  }
  signup = async (req, res, next) => {
    try {
      let userObject = req.body;
      let files = req.files.map((file) => {
        return file.filename;
      });
      userObject.register = {
        images: files,
      };
      let data = await this._authService.signup(userObject);
      files = req.files.map((file) => {
        return process.env.IMAGE_URL + file.filename;
      });
      let axiosData = {};
      axiosData[data._id] = files;
      const pythonResponse = await this._axios.post(
        process.env.FACIAL_MODEL_API_URL + "signup",
        axiosData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(pythonResponse.data);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };
  login = async (req, res, next) => {
    try {
      let data = await this._authService.login(
        req.body.email,
        req.body.password
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  };
  checkUserImage = async (req, res, next) => {
    try {
      let apiUrl = req.isVideos
        ? process.env.FACIAL_MODEL_API_URL + "signin_video"
        : process.env.FACIAL_MODEL_API_URL + "signin";
      let imageBaseUrl = req.isVideos
        ? process.env.TEMP_VIDEO_URL
        : process.env.TEMP_IMAGE_URL;
      let data = await this._authService.getUserFromToken(req.body.token);
      let files = req.files.map((file) => {
        return imageBaseUrl + file.filename;
      });
      let axiosData = {};
      axiosData[data._id] = files;
      const pythonResponse = await this._axios.post(apiUrl, axiosData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(pythonResponse.data);
      if (pythonResponse && pythonResponse.data) {
        if (
          pythonResponse.data.Names &&
          Array.isArray(pythonResponse.data.Names) &&
          pythonResponse.data.Names.length >= 1
        ) {
          if (pythonResponse.data.Names[0] == "Unknown")
            throw { status: 404, message: "User Not Verified" };
          res.json({ message: "User is Verified" });
          next();
        } else if (pythonResponse.data.Alert) {
          throw { status: 400, message: pythonResponse.data.Alert };
        }
      }

      throw { status: 404, message: "User Not Verified" };
    } catch (err) {
      next(err);
    }
  };

  checkUserGesture = async (req, res, next) => {
    try {
      let data = await this._authService.getUserFromToken(req.body.token);
      let files = req.files.map((file) => {
        return process.env.TEMP_IMAGE_URL + file.filename;
      });
      let axiosData = {};
      axiosData[data._id] = files;
      const pythonResponse = await this._axios.post(
        process.env.FACIAL_MODEL_API_URL + "gesture_check",
        axiosData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (pythonResponse && pythonResponse.data) {
        if (
          pythonResponse.data.user_name &&
          Array.isArray(pythonResponse.data.user_name) &&
          pythonResponse.data.user_name.length >= 1
        ) {
          let gesture = "";
          if (
            pythonResponse.data.four_finger_flag == true ||
            pythonResponse.data.four_finger_flag == "true"
          )
            gesture += "Four Finger";
          if (
            pythonResponse.data.thumbs_up_flag == true ||
            pythonResponse.data.thumbs_up_flag == "true"
          )
            gesture = gesture == "" ? "Thumbs Up" : ", Thumbs Up";
          if (
            pythonResponse.data.thumbs_down_flag == true ||
            pythonResponse.data.thumbs_down_flag == "true"
          )
            gesture = gesture == "" ? "Thumbs Down" : ", Thumbs Down";
          if (
            pythonResponse.data.fist_flag == true ||
            pythonResponse.data.fist_flag == "true"
          )
            gesture = gesture == "" ? "Fist" : ", Fist";
          if (
            pythonResponse.data.palm_flag == true ||
            pythonResponse.data.palm_flag == "true"
          )
            gesture = gesture == "" ? "Palm" : ", Palm";

          res.json({ gesture: gesture, message: "success" });
          next();
        }
      }

      throw { status: 404, message: "No Gesture Detected" };
    } catch (err) {
      next(err);
    }
  };

  send3dModel = async (req, res, next) => {
    try {
      let data = await this._authService.getUserFromToken(req.body.token);

      let files = req.files.map((file) => {
        return process.env.MODEL_3D_URL + file.filename;
      });
      let axiosData = {};
      axiosData["url"] = files && files.length ? files[0] : "";
      const pythonResponse = await this._axios.post(
        process.env.FACIAL_MODEL_3d_URL + "fetch_gltf",
        axiosData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (pythonResponse && pythonResponse.data) {
        res.json({ message: "success" });
        next();
      }
      throw { status: 400, message: "Server Response failed" };
    } catch (err) {
      next(err);
    }
  };
}
module.exports = AuthController;

class AuthService {
  constructor(USER) {
    this._USER = USER;
    this._Firebase = require("../utilities/Firebase");
  }

  signup = async (userObject) => {
    try {
      const duplicateProfile = await this._USER.findOne({
        email: userObject.email,
      });
      if (duplicateProfile) {
        throw new Error("Duplicate profile", 400);
      }
      let userInstance = await this._USER.create(userObject);
      userInstance.login.authToken = "fd9d3371-4968-" + userInstance._id;
      await userInstance.save();
      return userInstance;
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };

  login = async (email, password) => {
    try {
      const user = await this._USER.findOne({ email: email.toLowerCase() });
      if (!user)
        throw { status: 404, message: "No User Exists with this Email" };
      if (user.password != password)
        throw { status: 404, message: " passwords do not match" };
      return user;
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };
  getUserFromToken = async (token) => {
    try {
      const user = await this._USER.findOne({ "login.authToken": token });
      if (!user)
        throw { status: 404, message: "No User Exists with this Token" };
      return user;
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };
}

module.exports = AuthService;

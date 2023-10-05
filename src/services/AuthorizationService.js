const { ObjectId } = require("mongodb");
class AuthService {
  constructor(AUTHORIZATION) {
    this._AUTHORIZATION = AUTHORIZATION;
  }

  add = async (AuthObject) => {
    try {
      const duplicateProfile = await this._AUTHORIZATION.findOne({
        authorizedBy: AuthObject.authorizedBy,
        authorizedTo: AuthObject.authorizedTo,
      });
      if (duplicateProfile) {
        throw {
          status: 400,
          message: "Already Authorized",
        };
      }
      let authInstance = await this._AUTHORIZATION.create(AuthObject);
      return authInstance;
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };

  update = async (id, AuthObject) => {
    try {
      let authInstance = await this._AUTHORIZATION.findOneAndUpdate({_id:id},AuthObject,{new: true});
      if (!authInstance) {
        throw {
          status: 404,
          message: "Authorization Not found",
        };
      }
      authInstance = await this.getAuthorization(id)
      return authInstance;
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };

  getAuthorization = async (authId) => {
    try {
      const authArray = await this._AUTHORIZATION.findOne({
        _id: new ObjectId(authId),
      }).populate('assets');
      return authArray;
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };

  getAuthorizationsByMe = async (id) => {
    try {
      const authArray = await this._AUTHORIZATION.find({
        authorizedBy: new ObjectId(id),
      }).populate('assets');
      return authArray;
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };
  getAuthorizedToMe = async (id) => {
    try {
      const authArray = await this._AUTHORIZATION.find({
        authorizedTo: new ObjectId(id),
      }).populate('assets');
      return authArray;
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };

}

module.exports = AuthService;

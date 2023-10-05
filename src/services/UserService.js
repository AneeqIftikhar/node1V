const _AUTHORIZATION = require("../models/authorization.model");
class UserService {
  constructor(USER, ASSET) {
    this._USER = USER;
    this._ASSET = ASSET;
  }

  search = async (searchText, page, limit) => {
    try {
      let skip = page * limit - limit;
      let querySearch = {
        $or: [
          { username: new RegExp(searchText, "i") },
          { email: new RegExp(searchText, "i") },
        ],
      };
      let users = await this._USER
        .find(querySearch)
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });
      let usersCount = await this._USER.find(querySearch).count();

      return {
        users,
        totalPages: Math.ceil(usersCount / limit),
        currentPage: Number(page),
      };
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };

  getUserFromToken = async (token) => {
    try {
      const user = await this._USER
        .findOne({ "login.authToken": token })
        .populate("assets");
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
  addAsset = async (token, assetObject) => {
    try {
      const user = await this._USER.findOne({ "login.authToken": token });
      if (!user)
        throw { status: 404, message: "No User Exists with this Token" };
      let asset = await this._ASSET.create({ ...assetObject, user: user._id });
      return asset;
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };
  getAssets = async (token) => {
    try {
      const user = await this._USER.findOne({ "login.authToken": token });
      if (!user)
        throw { status: 404, message: "No User Exists with this Token" };
      let asset = await this._ASSET.find({ user: user._id }).lean();
      return asset;
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };
  getAuthorizedAssets = async (token) => {
    try {
      const user = await this._USER.findOne({ "login.authToken": token });
      if (!user)
        throw { status: 404, message: "No User Exists with this Token" };
      let authorizations = await _AUTHORIZATION
        .find({ authorizedTo: user._id })
        .populate("assets")
        .lean();
      let assets = [];
      authorizations.forEach((authorization) => {
        assets.push(...authorization.assets);
      });
      return assets;
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };
  getAllAssets = async (token) => {
    try {
      let myAssets = await this.getAssets(token);
      myAssets.forEach(
        (myAssets) => (myAssets.isAuthorized = false)
      );
      let authorizedAssets = await this.getAuthorizedAssets(token);
      authorizedAssets.forEach(
        (authorizedAsset) => (authorizedAsset.isAuthorized = true)
      );
      return [...myAssets, ...authorizedAssets];
    } catch (error) {
      throw {
        status: 500,
        message: error.errorInfo ? error.errorInfo.message : error.message,
      };
    }
  };
}

module.exports = UserService;

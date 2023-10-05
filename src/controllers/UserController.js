class UserController {
  constructor(userService) {
    this._userService = userService;
    this._axios = require("axios");
  }
  search = async (req, res, next) => {
    try {
      let searchText = req.query.searchText;
      let page = req.query.page ?? 1;
      let limit = req.query.pageSize ?? 10;

      let data = await this._userService.search(searchText, page, limit);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };
  getImages = async (req, res, next) => {
    try {
      let data = await this._userService.getUserFromToken(req.body.token);
      res.json({images:data.register.images.map((image) =>process.env.IMAGE_URL + image)});
    } catch (err) {
      next(err);
    }
  };
  addAsset = async (req, res, next) => {
    try {
      let data = await this._userService.addAsset(req.body.token, req.body.asset);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };
  getAssets = async (req, res, next) => {
    try {
      let data = await this._userService.getAssets(req.body.token);
      res.json({assets: data});
    } catch (err) {
      next(err);
    }
  };
  getAuthorizedAssets = async (req, res, next) => {
    try {
      let data = await this._userService.getAuthorizedAssets(req.body.token);
      res.json({assets: data});
    } catch (err) {
      next(err);
    }
  };
  getAllAssets = async (req, res, next) => {
    try {
      let data = await this._userService.getAllAssets(req.body.token);
      res.json({assets: data});
    } catch (err) {
      next(err);
    }
  };
}
module.exports = UserController;

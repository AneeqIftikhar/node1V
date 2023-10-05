class UserController {
    constructor(authorizationService, userService) {
      this._authorizationServcie = authorizationService;
      this._userService = userService;
    }
    add = async (req, res, next) => {
      try {
        const authorizedTo = req.body.authorizedTo;
        const authorizedBy = await this._userService.getUserFromToken(req.body.token);
        let data = await this._authorizationServcie.add({authorizedBy: authorizedBy._id, authorizedTo: authorizedTo, assets: req.body.assets});
        res.json({message: "Auth added successfully", data});
      } catch (err) {
        next(err);
      }
    };
    update = async (req, res, next) => {
      try {
        const authorizedTo = req.body.authorizedTo;
        const authorizedBy = await this._userService.getUserFromToken(req.body.token);
        let data = await this._authorizationServcie.update(req.params.id,{authorizedBy: authorizedBy._id, authorizedTo: authorizedTo, assets: req.body.assets});
        res.json({message: "Auth updated successfully", data});
      } catch (err) {
        next(err);
      }
    };
    getAuthorization = async (req, res, next) => {
      try {
        const user = await this._userService.getUserFromToken(req.body.token);
        let data = await this._authorizationServcie.getAuthorizationsByMe(user._id);
        res.json({authorizations: data});
      } catch (err) {
        next(err);
      }
    };
  }
  module.exports = UserController;
  
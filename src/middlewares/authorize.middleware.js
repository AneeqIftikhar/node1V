const admin = require("../utilities/firebase");
const User = require("../models").user;
const middleware =  () => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const idToken = authHeader;     
      admin
        .auth()
        .verifyIdToken(idToken)
        .then(function (decodedToken) {
          User.findOne({
            where: { firebaseUid: decodedToken.uid },
          })
            .then((user) => {
                            req.currentUser = user;
              next();
            })
            .catch((error) => {
              res
                .status(401)
                .json({ errorCode: 401, message: error.errorInfo
                  ? error.errorInfo.message
                  : error.message });
            });
        })
        .catch(function (error) {
          res
            .status(403)
            .json({ errorCode: 403, message: error.errorInfo
              ? error.errorInfo.message
              : error.message });
        });
    } else {
      res
        .status(401)
        .json({ errorCode: 401, message: "Not Authourized to make this Request" });
    }
  };
};
module.exports = middleware;

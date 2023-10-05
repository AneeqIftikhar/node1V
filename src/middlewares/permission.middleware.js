const { roles } = require('../utilities/roles')

const middleware = (action, resource) => {
    return async (req, res, next) => {
    try {
        const permission = roles.can(req.currentUser.role)[action](resource);
        if (!permission.granted) {
           return res
            .status(401)
            .json({ errorCode: 401, message: "You don't have enough permission to perform this action" });
        }
        next()
        } catch (error) {
        next(error)
        }
    };
};
module.exports = middleware;
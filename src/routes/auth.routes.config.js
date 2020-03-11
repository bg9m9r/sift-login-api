
const AuthMiddleware = require('../middleware/auth');
const AuthController = require('../controllers/auth');

exports.routesConfig = function (app) {

    app.post('/auth', [
        AuthMiddleware.hasAuthValidFields,
        AuthMiddleware.isPasswordAndUserMatch,
        AuthController.login
    ]);
};

const UsersController = require('../controllers/users');
const AuthMiddleware = require('../middleware/auth');


exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.insert
    ]);
    app.get('/users', [
        AuthMiddleware.validJWTNeeded,
        UsersController.list
    ]);
    app.get('/users/:userId', [
        AuthMiddleware.validJWTNeeded,
        UsersController.getById
    ]);
    app.patch('/users/:userId', [
        AuthMiddleware.validJWTNeeded,
        AuthMiddleware.onlySameUserCanDoThisAction,
        UsersController.patchById
    ]);
    app.delete('/users/:userId', [
        AuthMiddleware.validJWTNeeded,
        AuthMiddleware.onlySameUserCanDoThisAction,
        UsersController.disableById
    ]);
};
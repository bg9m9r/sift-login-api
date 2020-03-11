const jwtSecret = require('../../config/config.js').jwt_secret,
    jwt = require('jsonwebtoken'), crypto = require('crypto');

exports.login = (req, res) => {
    try {
        let salt = crypto.randomBytes(16).toString('base64');
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(201).send({accessToken: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};
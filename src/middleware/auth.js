const jwt = require('jsonwebtoken'),
    secret = require('../../config/config.js').jwt_secret,
    crypto = require('crypto'),
    db = require('../models');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    db.User.findOne({ where: { email: req.body.email } 
                    })
        .then((user)=>{
            if(!user){
                res.status(404).send({});
            }else{
                let passwordFields = user.dataValues.password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user.dataValues.id,
                        email: user.dataValues.email,
                        name: user.dataValues.name,
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid e-mail or password']});
                }
            }
        })
        .catch((err) => console.log(err));
};


exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};


exports.onlySameUserCanDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;
    if (req.params && req.params.userId && userId === parseInt(req.params.userId)) {
        return next();
    } else {
        res.status(403).send();
    }

};

exports.sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;

    if (req.params.userId !== userId) {
        return next();
    } else {
        return res.status(400).send();
    }

};

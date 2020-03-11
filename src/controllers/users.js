const db = require('../models')
const crypto = require('crypto');


exports.insert = (req,res) => {
    const { name, password, title, email, company, yearsOfExperience, skills } = req.body;

    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    let saltedPassword = salt + "$" + hash;
    db.User.create({ name, password: saltedPassword, title, email, company, yearsOfExperience, skills })
        .then((result) => {
            res.status(201).send({id: result.dataValues});
        });
}

exports.list = (req, res) => {
    return db.User.findAll({where: { disabled: false } })
    .then((users) => res.send(users))
    .catch((err) => {
        console.log(err);
        return res.send(err);
    })
}

exports.getById = (req, res) => {
    return db.User.findOne({where: {id: req.params.userId}})
    .then((user) => {

        if(!user){
            return res.status(404).send();
        }
        return res.send(user);

    })
    .catch((err) => {
        console.log(err);
        return res.send(err);
    })
}

exports.patchById = (req, res) => {
    const id = parseInt(req.params.userId)
    return db.User.findOne({where: {id: id} })
    .then((user) => {
        const { name, password, title, email, company, yearsOfExperience, skills } = req.body;
      return user.update({ name, password, title, email, company, yearsOfExperience, skills })
        .then(() => res.send(user))
        .catch((err) => {
          console.log('***Error updating user', JSON.stringify(err))
          res.status(400).send(err)
        })
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })

}

exports.disableById = (req, res) => {
    const id = parseInt(req.params.userId)
    return db.User.findOne({where: {id: id} })
    .then((user) => {
      return user.update({ disabled: true })
        .then(() => res.send(user))
        .catch((err) => {
          console.log('***Error updating user', JSON.stringify(err))
          res.status(400).send(err)
        })
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
}
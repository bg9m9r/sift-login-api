'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    yearsOfExperience: DataTypes.STRING,
    skills: DataTypes.STRING,
    email: DataTypes.STRING,
    disabled: DataTypes.BOOLEAN
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};
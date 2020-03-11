'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    yearsOfExperience: DataTypes.STRING,
    skills: DataTypes.STRING,
    email: DataTypes.STRING,
    disabled: DataTypes.BOOLEAN
  }, {});
  return User;
};
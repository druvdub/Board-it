/**
 * defines the Model for user table in database
 *
 * @param {*} sequelize
 * @param {*} Sequelize
 * @returns User table
 */
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });
  return User;
};

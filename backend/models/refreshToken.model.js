const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");
/**
 * defines the Model for refresh token table in database
 *
 * @param {*} sequelize
 * @param {*} Sequelize
 * @returns refresh token table
 */
module.exports = (sequelize, Sequelize) => {
  // creates token model
  const RefreshToken = sequelize.define("refreshToken", {
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
  });
  // creates a refresh token with expiry timestamp, id, and token in database
  RefreshToken.createToken = async function (user) {
    let expiredTime = new Date();
    expiredTime.setSeconds(
      expiredTime.getSeconds() + config.jwtRefreshExpiration
    );
    let _token = uuidv4();
    let refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredTime.getTime(),
    });
    return refreshToken.token;
  };
  // verifies expiration time of token
  RefreshToken.verifyExpiry = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };
  return RefreshToken;
};

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const { TokenExpiredError } = jwt;

/**
 * handles error if TokenExpiredError is raised
 *
 * @param {*} err - error
 * @param {*} res - response status
 * @returns {object} - sends message Access Token expired
 */
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({
      message: "Access Token expired",
    });
  }
};

/**
 * Verifies the validity of token
 */
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = { verifyToken };

module.exports = authJwt;

const db = require("../models");
const config = require("../config/auth.config");
const { user: User, refreshToken: RefreshToken } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Op = db.Sequelize.Op;

/**
 * @route POST /api/auth/signup
 * Function to handle signup, uses bcrypt to hash the password with salt of length 12
 *
 * @param {object} req - is the request we get from frontend at the endpoint, here i.e. {email, password}
 * @param {object} res - is the response we send to the endpoint
 *
 */
exports.signup = (req, res) => {
  // saves user to database and checks table for verification
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
  })
    .then((user) => {
      if (req.body.email) {
        User.findOne({
          where: {
            email: {
              [Op.eq]: req.body.email,
            },
          },
        }).then(() => {
          res.send({ message: `Signup successful for ${user}` });
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

/**
 * @route POST /api/auth/login
 * Function to handle the login process, checks validity of password
 *
 * @param {object} req - is the request we get from frontend at the endpoint, here i.e. {email, password}
 * @param {object} res - is the response we send to the endpoint
 */
exports.login = (req, res) => {
  // finds user in database
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(401).send({
          accessToken: null,
          message: "Incorrect Password",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);
      currentID = user.id;
      return res.status(200).send({
        id: user.id,
        email: user.email,
        accessToken: token,
        refreshToken: refreshToken,
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

/**
 * @route POST /api/auth/refreshtoken
 * Handles the refresh token and destroys the refresh token if expired,
 * and generates a new access token with token config if not expired
 *
 * @param {object} req - request from frontend, with refresh token
 * @param {object} res - response
 * @returns {object} - { accessToken, refreshToken } sends token strings
 */
exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });

    if (!refreshToken) {
      res.status(403).json({ message: "token not in database" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      return res.status(403).send({
        message: "Refresh token was expired. New login request needed",
      });
    }

    const user = await refreshToken.getUser();
    let newToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

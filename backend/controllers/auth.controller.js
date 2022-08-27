const db = require("../models");
const config = require("../config/auth.config");
const { user: User, refreshToken: RefreshToken } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Op = db.Sequelize.Op;

var currentID;

exports.signup = (req, res) => {
  // save user to database
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

exports.login = (req, res) => {
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

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });

    console.log(refreshToken);

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

exports.logout = async (req, res, next) => {
  // const { refreshToken: requestToken } = req.body;
  // console.log(req);
  try {
    // let refreshToken = await RefreshToken.findOne({
    //   where: {
    //     token: requestToken,
    //   },
    // });

    RefreshToken.destroy({ where: { Userid: currentID } });
    req.session = null;

    return res.status(200).send({
      message: "Logged Out",
    });
  } catch (err) {
    next(err);
  }
};

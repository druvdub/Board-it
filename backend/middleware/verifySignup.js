const db = require("../models");

const User = db.user;

checkDuplicate = async (req, res, next) => {
  try {
    email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (email) {
      return res.status(400).send({
        message: "Email already in use!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate email!",
    });
  }
};

const verifySignup = {
  checkDuplicate,
};

module.exports = verifySignup;

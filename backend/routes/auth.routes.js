const controller = require("../controllers/auth.controller");
const { verifySignup } = require("../middleware");

/**
 * Sets up routes for authentication functions
 *
 * @param {*} app - express()
 */
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
      "Access-Control-Allow-Origin"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [verifySignup.checkDuplicate],
    controller.signup
  );
  app.post("/api/auth/login", controller.login);
  app.post("/api/auth/refreshtoken", controller.refreshToken);
};

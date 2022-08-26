const controller = require("../controllers/auth.controller");
const { verifySignup } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin Content-Type Accept",
      "Access-Control-Allow-Origin"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [verifySignup.checkDuplicate],
    controller.register
  );
  app.post("/api/auth/login", controller.login);
  app.post("/api/auth/logout", controller.logout);
  // app.post("/api/auth/refreshtoken", controller.refreshToken);
};

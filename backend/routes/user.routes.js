const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

/**
 * Sets up routes for data functions
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

  app.post("/api/data/board", [authJwt.verifyToken], controller.receiveData);
  app.get("/api/data/board/fetch", [authJwt.verifyToken], controller.fetchData);
};

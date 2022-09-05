/**
 * prints request method, url, and status code with a timestamp
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function logger(req, res, next) {
  res.on("finish", () => {
    console.log(
      `${req.method} ${req.originalUrl} ${
        res.statusCode
      } [${new Date().toLocaleString()}]`
    );
  });
  next();
}

const logger = (req, res, next) => {
  res.on("finish", () => {
    console.log(
      `${req.method} ${req.originalUrl} ${
        res.statusCode
      } [${new Date().toLocaleString()}]`
    );
  });
  next();
};

export default logger;

const express = require("express");
const cors = require("cors");
const session = require("cookie-session");
const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

// db.sequelize.sync();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use(express.json());
app.use(require("./middleware/logger"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    httpOnly: true,
  })
);

app.get("/", (req, res) => {
  console.log(req.session.user);

  res.send("test");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

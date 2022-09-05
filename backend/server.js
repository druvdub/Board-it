const express = require("express");
const cors = require("cors");
const session = require("cookie-session");
const db = require("./models");

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
// });

db.sequelize.sync();

const app = express();
const path = `${__dirname}/views/frontend/`;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

// defining middleware
app.use(express.json());
app.use(require("./middleware/logger"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    httpOnly: true,
  })
);

app.use(express.static(path));

app.get("/", (req, res) => {
  console.log(req.session.user);
  res.send({ message: "test" });
  // res.sendFile(`${path}index.html`);
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

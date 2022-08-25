const express = require("express");
const cors = require("cors");
const session = require("cookie-session");
const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

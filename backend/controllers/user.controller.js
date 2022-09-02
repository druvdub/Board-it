const db = require("../models");
const { data: Data } = db;

const Op = db.Sequelize.Op;

exports.receiveData = (req, res) => {
  Data.findOne({
    where: {
      boardName: req.body.board,
    },
  })
    .then(async (data) => {
      if (!data) {
        Data.create({
          boardName: req.body.board,
          columns: req.body.columns,
        });
      }
      Data.update(
        { columns: req.body.columns },
        {
          where: {
            boardName: req.body.board,
          },
        }
      ).then((result) => {
        res.status(200).send({ message: "Yay it worked?" });
      });
    })
    .catch((err) => {
      res.status(200).send({ message: `${err.message}` });
      console.log(err);
    });
};

exports.fetchData = (req, res) => {
  Data.findOne({
    where: {
      boardName: "Board-it",
    },
  })
    .then(async (obj) => {
      return res.status(200).send(
        JSON.stringify({
          board: obj.boardName,
          columns: obj.columns,
        })
      );
    })
    .catch((err) => {
      res.status(401).send({ message: `${err.message}` });
    });
};

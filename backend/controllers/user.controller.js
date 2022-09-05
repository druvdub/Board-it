const db = require("../models");
const { data: Data } = db;

const Op = db.Sequelize.Op;

/**
 * @route POST /api/data/board
 * Receives data from the frontend about the kanban board and creates or updates in the database
 *
 * @param {object} req - gets { userId, boardName, columnData }
 * @param {object} res - sends status update
 */
exports.receiveData = (req, res) => {
  Data.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        Data.create({
          boardName: req.body.board,
          columns: req.body.columns,
          userId: req.userId,
        });
      }
      Data.update(
        { columns: req.body.columns },
        {
          where: {
            boardName: req.body.board,
            userId: req.userId,
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

/**
 * @route GET /api/data/board/fetch
 * Fetches data from the database and sends it to the frontend
 *
 * @param {object} req - gets { userId }
 * @param {object} res - sends { boardName, columnData }
 */
exports.fetchData = (req, res) => {
  Data.findOne({
    where: {
      boardName: "Board-it",
      userId: req.userId,
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

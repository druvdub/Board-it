module.exports = (sequelize, Sequelize) => {
  const Data = sequelize.define("dataset", {
    boardName: {
      type: Sequelize.STRING,
      unique: true,
    },
    columns: {
      type: Sequelize.STRING,
    },
  });

  return Data;
};

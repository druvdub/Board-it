module.exports = (sequelize, Sequelize) => {
  const Data = sequelize.define("dataset", {
    boardName: {
      type: Sequelize.STRING,
    },
    columns: {
      type: Sequelize.STRING,
    },
  });

  return Data;
};

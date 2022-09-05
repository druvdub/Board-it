/**
 * defines the Model for data table in database
 *
 * @param {*} sequelize
 * @param {*} Sequelize
 * @returns Data table
 */
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

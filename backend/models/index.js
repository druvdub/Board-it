const config = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// creates the tables in database
db.user = require("./user.model")(sequelize, Sequelize);
db.refreshToken = require("./refreshToken.model")(sequelize, Sequelize);
db.data = require("./data.model")(sequelize, Sequelize);

// defines associations between different tables

db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});

db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "id",
});

db.data.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});

db.user.hasOne(db.data, {
  foreignKey: "userId",
  targetKey: "id",
});

module.exports = db;

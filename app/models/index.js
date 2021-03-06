const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  //dbConfig.DBNAME,
  //dbConfig.DBUSER,
  //dbConfig.DBPASSWORD,
  {
    host: process.env.HOST,
    //host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
// db.comments = require("./comment.model.js")(sequelize, Sequelize);

db.places = require("./place.model.js")(sequelize, Sequelize);
db.photos = require("./photo.model.js")(sequelize, Sequelize);

db.places.hasMany(db.photos,{foreignKey: 'fk_placeid', sourceKey: 'id'})
db.photos.belongsTo(db.places,{foreignKey: 'fk_placeid', targetKey: 'id'})

module.exports = db;
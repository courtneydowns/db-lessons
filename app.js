require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DBNAME,
  process.env.DB_USER,
  process.env.DB_PASS,

  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

//TO CREATE A MODEL
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
  },
});

/*
 *One to One Rel
 *
 */

/*
 *One to Many
 *
 */

/*
 *Many to Many
 *
 */

(async () => {
  await sequelize.sync();
})();

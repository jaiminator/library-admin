const { Sequelize } = require("sequelize"); //import module Sequelize

// Connect to database with Sequelize
const sequelize = new Sequelize("libraryadmin", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

const db = {};

// Add Sequelize to object 'db'
db.sequelize = sequelize;

module.exports = db;    //export module 'db' used to create models

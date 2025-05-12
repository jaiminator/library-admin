const { DataTypes } = require("sequelize");
const db = require("../db");

const Book = db.sequelize.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    publication_year: {
      type: DataTypes.INTEGER,
    },
    ISBN: {
      type: DataTypes.BIGINT,
    }
  },
  {}
);

module.exports = Book;

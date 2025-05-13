const { DataTypes } = require("sequelize");
const db = require("../db");

const Member = db.sequelize.define(
  "Member",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    }
  },
  {}
);

module.exports = Member;

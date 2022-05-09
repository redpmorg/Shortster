import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("url", {
    urllong: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    urlshort: {
      type: DataTypes.STRING,
      unique: true,
    },
    accessed: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  });
}
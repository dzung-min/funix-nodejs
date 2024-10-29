import { DataTypes } from "sequelize"

import sequelize from "../utils/database.mjs"

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: DataTypes.STRING,
  price: {
    type: DataTypes.FLOAT(2),
    allowNull: false,
  },
  description: DataTypes.TEXT,
})

export default Product

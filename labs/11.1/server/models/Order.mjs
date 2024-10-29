import { DataTypes } from "sequelize"

import sequelize from "../utils/database.mjs"

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
})

export default Order

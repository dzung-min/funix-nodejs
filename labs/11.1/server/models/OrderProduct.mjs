import { DataTypes } from "sequelize"

import sequelize from "../utils/database.mjs"

const OrderProduct = sequelize.define("orderproduct", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

export default OrderProduct

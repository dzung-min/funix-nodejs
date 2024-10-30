import { DataTypes } from "sequelize"

import sequelize from "../utils/database.mjs"

const Cart = sequelize.define("cart", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
})

export default Cart

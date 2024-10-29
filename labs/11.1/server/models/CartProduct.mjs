import { DataTypes } from "sequelize"

import sequelize from "../utils/database.mjs"

const CartProduct = sequelize.define("cartproduct", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

export default CartProduct

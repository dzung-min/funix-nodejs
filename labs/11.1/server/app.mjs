import express from "express"
import cors from "cors"
import morgan from "morgan"

import sequelize from "./utils/database.mjs"
import productRouter from "./routes/product.mjs"
import cartRouter from "./routes/cart.mjs"
import injectUser from "./middlewares/inject-user.mjs"
import Cart from "./models/Cart.mjs"
import Product from "./models/Product.mjs"
import User from "./models/User.mjs"
import CartProduct from "./models/CartProduct.mjs"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(injectUser)
app.use("/", productRouter)
app.use("/cart", cartRouter)

User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartProduct })
Product.belongsToMany(Cart, { through: CartProduct })

async function bootstrap() {
  await sequelize.sync({ force: false })
  // create user if not exist
  let user = await User.findByPk(1)
  if (!user) {
    await User.create({ name: "Dzung", email: "dzung@email.com" })
  }
  app.listen(3000)
}

bootstrap()

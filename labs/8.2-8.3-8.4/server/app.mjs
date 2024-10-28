import express from "express"
import cors from "cors"
import morgan from "morgan"

import productRouter from "./routes/product.mjs"
import cartRouter from "./routes/cart.mjs"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", productRouter)
app.use("/cart", cartRouter)

app.listen(3000)

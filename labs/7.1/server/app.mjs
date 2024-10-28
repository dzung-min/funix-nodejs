import express from "express"
import cors from "cors"
import productRoute from "./routes/product.mjs"
import morgan from "morgan"
const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", productRoute)

app.listen(3000)

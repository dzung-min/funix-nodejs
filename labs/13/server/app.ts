import express from "express"
import { configDotenv } from "dotenv"
import logger from "morgan"
import cors from "cors"
import mongoose from "mongoose"

import router from "./routes/router"

configDotenv()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(logger("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

async function bootstrap() {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

bootstrap()

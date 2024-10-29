import { Sequelize } from "sequelize"
import { configDotenv } from "dotenv"

configDotenv()
const { DB_HOST, DB_NAME, DB_USER, DB_PWRD } = process.env
const sequelize = new Sequelize({
  dialect: "mysql",
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PWRD,
  logging: false,
})

export default sequelize

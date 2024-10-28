import { createPool } from "mysql2/promise"
import { configDotenv } from "dotenv"
import { join } from "node:path"

import { __dirname } from "./path.mjs"

configDotenv({ path: join(__dirname, ".env") })

const { DB_HOST, DB_USER, DB_PWRD, DB_NAME } = process.env

export const db = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PWRD,
  database: DB_NAME,
})

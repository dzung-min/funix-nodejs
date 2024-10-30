import { Db, MongoClient } from "mongodb"
import { configDotenv } from "dotenv"
import { join } from "node:path"

import { __dirname } from "./path.mjs"

configDotenv({ path: join(__dirname, ".env") })

const { MONGO_URI } = process.env

/**
 *
 * @returns {Promise<Db>}
 */
async function dbConnect() {
  if (!process.mongodb) {
    const client = await MongoClient.connect(MONGO_URI)
    const db = client.db("funix")
    process.mongodb = db
  }
  return process.mongodb
}

export default dbConnect

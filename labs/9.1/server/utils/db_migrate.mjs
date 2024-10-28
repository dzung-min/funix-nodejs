import mysql from "mysql2/promise"
import { configDotenv } from "dotenv"
import { join } from "node:path"
import { readFile } from "node:fs/promises"

import { __dirname } from "./path.mjs"

configDotenv({ path: join(__dirname, ".env") })

const { DB_HOST, DB_USER, DB_PWRD, DB_NAME } = process.env

// Create the connection to database
const connection = await mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PWRD,
  database: DB_NAME,
})

await connection.query(
  `
  DROP TABLE IF EXISTS products
  `
)

await connection.query(
  `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    price FLOAT(2) NOT NULL,
    description TEXT NOT NULL
  )
  `
)

// read data from products.json
const fileContent = await readFile(
  join(__dirname, "datas", "products.json"),
  "utf-8"
)
const products = JSON.parse(fileContent)
const insertData = products
  .map(
    (prod) =>
      `("${prod.title}", "${prod.imageUrl}", ${prod.price}, "${prod.description}")`
  )
  .join(", ")

await connection.execute(
  `
  INSERT INTO products (title, imageUrl, price, description)
  VALUES ${insertData};
  `
)

connection.destroy()

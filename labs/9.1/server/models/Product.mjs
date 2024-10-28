import { __dirname } from "../utils/path.mjs"
import { join } from "node:path"
import { db } from "../utils/database.mjs"

export default class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title
    this.imageUrl = imageUrl
    this.price = price
    this.description = description
  }

  static async findAll() {
    const [products] = await db.query("SELECT * FROM products")
    return products
  }

  static async findById(id) {
    const [products] = await db.execute("SELECT * FROM products WHERE id = ?", [
      id,
    ])
    return products[0]
  }

  async save() {
    const products = await Product.findAll()
    this.id = uuid()
    products.push(this)
    await writeFile(
      join(__dirname, "datas", "products.json"),
      JSON.stringify(products)
    )
  }
}

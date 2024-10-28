import { readFile, writeFile } from "node:fs/promises"
import { __dirname } from "../path.mjs"
import { join } from "node:path"
import { v4 as uuid } from "uuid"

export default class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title
    this.imageUrl = imageUrl
    this.price = price
    this.description = description
  }

  static async findAll() {
    try {
      const res = await readFile(
        join(__dirname, "datas", "products.json"),
        "utf-8"
      )
      const data = JSON.parse(res)
      const products = data.map((item) => {
        const product = new Product(
          item.title,
          item.imageUrl,
          item.price,
          item.description
        )
        product.id = item.id || uuid()
        return product
      })
      return products
    } catch (error) {
      return []
    }
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

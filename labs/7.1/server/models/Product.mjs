import { readFile, writeFile } from "node:fs/promises"
import { __dirname } from "../path.mjs"
import { join } from "node:path"

export default class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title
    this.imageUrl = imageUrl
    this.price = price
    this.description = description
  }

  static async findAll() {
    const res = await readFile(
      join(__dirname, "datas", "products.json"),
      "utf-8"
    )
    const data = JSON.parse(res)
    const products = data.map(
      (item) =>
        new Product(item.title, item.imageUrl, item.price, item.description)
    )
    return products
  }

  async save() {
    const products = await Product.findAll()
    products.push(this)
    await writeFile(
      join(__dirname, "datas", "products.json"),
      JSON.stringify(products)
    )
  }
}

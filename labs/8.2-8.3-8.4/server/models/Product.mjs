import { readFile, writeFile } from "node:fs/promises"
import { __dirname } from "../path.mjs"
import { join } from "node:path"
import { v4 as uuid } from "uuid"

export default class Product {
  constructor(title, imageUrl, price, description, id = null) {
    if (id) {
      this.id = id
    }
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

  static async findById(id) {
    const products = await Product.findAll()
    const product = products.find((prod) => prod.id === id)
    return product
  }

  async save() {
    const products = await Product.findAll()
    if (!this.id) {
      // handle the case where new product is created
      this.id = uuid()
      products.push(this)
    } else {
      // update existing product
      // find product position
      const productIndex = products.findIndex((prod) => prod.id === this.id)
      // repalce the product with updated one
      products[productIndex] = this
    }
    await writeFile(
      join(__dirname, "datas", "products.json"),
      JSON.stringify(products)
    )
  }
}

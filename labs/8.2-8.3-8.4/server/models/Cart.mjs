import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

import { __dirname } from "../path.mjs"

export default class Cart {
  constructor(products, totalPrice) {
    this.products = products
    this.totalPrice = totalPrice
  }

  static async addProduct(id, price) {
    let cart
    try {
      const fileContent = await readFile(
        join(__dirname, "datas", "cart.json"),
        "utf-8"
      )
      const parsedFileContent = JSON.parse(fileContent)
      cart = new Cart(parsedFileContent.products, +parsedFileContent.totalPrice)
      const productIndex = cart.products.findIndex(
        (product) => product.id === id
      )
      if (productIndex >= 0) {
        cart.products[productIndex].qty++
      } else {
        cart.products.push({ id, qty: 1 })
      }
      cart.totalPrice += price
    } catch (error) {
      cart = new Cart([], 0)
      cart.products.push({ id, qty: 1 })
      cart.totalPrice = price
    } finally {
      await writeFile(
        join(__dirname, "datas", "cart.json"),
        JSON.stringify(cart),
        { encoding: "utf-8" }
      )
    }
  }

  static async getCart() {
    let cart
    try {
      const fileContent = await readFile(
        join(__dirname, "datas", "cart.json"),
        "utf-8"
      )
      const parsedFileContent = JSON.parse(fileContent)
      if (!parsedFileContent) cart = new Cart([], 0)
      else
        cart = new Cart(
          parsedFileContent.products,
          parsedFileContent.totalPrice
        )
    } catch (error) {
      cart = new Cart([], 0)
    } finally {
      return cart
    }
  }
}

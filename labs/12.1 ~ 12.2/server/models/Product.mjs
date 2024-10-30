import { ObjectId } from "mongodb"
import dbConnect from "../utils/database.mjs"

export default class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title
    this.imageUrl = imageUrl
    this.price = price
    this.description = description
  }

  async save() {
    const db = await dbConnect()
    if (!this._id) await db.collection("products").insertOne(this)
    else
      await db
        .collection("products")
        .findOneAndUpdate({ _id: this._id }, { $set: { ...this } })
  }

  static async findAll() {
    const db = await dbConnect()
    const cursor = db.collection("products").find()
    const data = await cursor.toArray()
    return data
  }

  static async findById(id) {
    const db = await dbConnect()
    const product = db.collection("products").findOne({ _id: new ObjectId(id) })
    return product
  }

  static async update(updateProduct) {
    const { id, title, imageUrl, price, description } = updateProduct
    const product = new Product(title, imageUrl, price, description)
    product._id = new ObjectId(id)
    await product.save()
  }
}

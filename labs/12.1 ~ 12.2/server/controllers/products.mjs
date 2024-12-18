import Product from "../models/Product.mjs"
import { ObjectId } from "mongodb"

/**
 *
 * @type {import("express").RequestHandler}
 */
export async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @type {import("express").RequestHandler}
 */
export async function addProduct(req, res, next) {
  const { title, imageUrl, price, description } = req.body
  const product = new Product(title, imageUrl, price, description)
  try {
    await product.save()
    res.end()
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @type {import("express").RequestHandler}
 */
export async function getProduct(req, res, next) {
  const productId = req.params.productId
  const product = await Product.findById(productId)
  console.log(product)
  res.json(product)
}

/**
 *
 * @type {import("express").RequestHandler}
 */
export async function updateProduct(req, res, next) {
  const { id, title, imageUrl, price, description } = req.body
  try {
    await Product.update({
      id,
      title,
      imageUrl,
      price,
      description,
    })
    res.end()
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @type {import("express").RequestHandler}
 */
export async function deleteProduct(req, res, next) {
  try {
    await Product.destroy({ where: { id: req.params.productId } })
    res.end()
  } catch (error) {}
}

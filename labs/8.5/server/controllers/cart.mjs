import Cart from "../models/Cart.mjs"
import Product from "../models/Product.mjs"
import { __dirname } from "../path.mjs"

/**
 *
 * @type {import("express").RequestHandler}
 */
export async function getCart(req, res, next) {
  const cart = await Cart.getCart()
  const products = await Product.findAll()

  const productsWithName = cart.products.map((cartProduct) => {
    const productIndex = products.findIndex(
      (prod) => prod.id === cartProduct.id
    )
    return {
      id: cartProduct.id,
      title: products[productIndex].title,
      qty: cartProduct.qty,
    }
  })

  cart.products = productsWithName

  res.json(cart)
}

/**
 *
 * @type {import("express").RequestHandler}
 */
export async function addProductToCart(req, res, next) {
  try {
    const { id, price } = req.body
    await Cart.addProduct(id, +price)
    res.end()
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @type {import("express").RequestHandler}
 */
export async function removeProductFromCart(req, res, next) {
  try {
    const productId = req.params.productId
    const product = await Product.findById(productId)
    await Cart.remove(product)
    res.end()
  } catch (error) {
    next(error)
  }
}

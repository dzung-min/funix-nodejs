import Product from "../models/Product.mjs"
import { __dirname } from "../utils/path.mjs"

/**
 *
 * @type {import("express").RequestHandler}
 */
export async function getCart(req, res, next) {
  try {
    let cart = await req.user.getCart()
    if (!cart) {
      cart = await req.user.createCart()
    }
    const products = await cart.getProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @type {import("express").RequestHandler}
 */
export async function addProductToCart(req, res, next) {
  try {
    const { id } = req.body
    const cart = await req.user.getCart()
    const products = await cart.getProducts()
    const productIndex = products.findIndex((prod) => prod.id === id)
    let product
    let newQuantity = 1
    if (productIndex >= 0) {
      product = products[productIndex]
      newQuantity = product.cartproduct.quantity + 1
    } else {
      product = await Product.findByPk(id)
    }
    cart.addProduct(product, { through: { quantity: newQuantity } })
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
    const productId = +req.params.productId
    const cart = await req.user.getCart()
    const products = await cart.getProducts()
    const productIndex = products.findIndex((prod) => prod.id === productId)
    const product = products[productIndex]
    if (product.cartproduct.quantity > 1) {
      await cart.addProduct(product, {
        through: { quantity: product.cartproduct.quantity - 1 },
      })
    } else {
      await cart.removeProduct(product)
    }
    res.end()
  } catch (error) {
    next(error)
  }
}

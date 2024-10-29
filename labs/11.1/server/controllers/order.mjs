import Product from "../models/Product.mjs"
import Order from "../models/Order.mjs"

/**
 *
 * @type {import("express").RequestHandler}
 */
export async function getOrders(req, res, next) {
  try {
    const orders = await req.user.getOrders({ include: [Product] })
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @type {import("express").RequestHandler}
 */
export async function createOrder(req, res, next) {
  try {
    const order = await req.user.createOrder()
    const cart = await req.user.getCart()
    const products = await cart.getProducts()
    const orderProducts = products.map((prod) => {
      prod.orderproduct = { quantity: prod.cartproduct.quantity }
      return prod
    })
    await order.addProducts(orderProducts)
    await req.user.setCart(null)
    res.end()
  } catch (error) {
    next(error)
  }
}

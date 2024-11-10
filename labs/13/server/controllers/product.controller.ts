import { NextFunction, Request, Response } from "express"
import Product from "../models/product.model"

export async function findAllProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

export async function findProductById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(404)
      throw Error("Product not found")
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, imageUrl, price, description } = req.body
  console.log(req.body)
  try {
    const product = new Product({ title, imageUrl, price, description })
    await product.save()
    res.end()
  } catch (error) {
    next(error)
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id
  const { title, imageUrl, price, description } = req.body
  try {
    const product = await Product.findById(id)
    if (!product) {
      res.status(404)
      throw Error("Product not found")
    }
    product.title = title
    product.imageUrl = imageUrl
    product.price = price
    product.description = description
    await product.save()
    res.end()
  } catch (error) {
    next(error)
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.end()
      return
    }
    await product.deleteOne()
    res.end()
  } catch (error) {
    next(error)
  }
}

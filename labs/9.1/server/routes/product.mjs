import { Router } from "express"

import {
  getProducts,
  addProduct,
  getProduct,
} from "../controllers/products.mjs"

const router = Router()

router.get("/products", getProducts)
router.get("/products/:id", getProduct)
router.post("/add-product", addProduct)

export default router

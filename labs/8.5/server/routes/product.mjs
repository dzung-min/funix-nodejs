import { Router } from "express"

import {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
} from "../controllers/products.mjs"

const router = Router()

router.get("/products", getProducts)
router.post("/products", addProduct)
router.get("/products/:productId", getProduct)
router.patch("/products", updateProduct)

export default router

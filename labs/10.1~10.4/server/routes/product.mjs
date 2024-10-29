import { Router } from "express"

import {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.mjs"

const router = Router()

router.get("/products", getProducts)
router.post("/products", addProduct)
router.get("/products/:productId", getProduct)
router.patch("/products", updateProduct)
router.delete("/products/:productId", deleteProduct)

export default router

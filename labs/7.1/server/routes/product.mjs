import { Router } from "express"

import { getProducts, addProduct } from "../controllers/products.mjs"

const router = Router()

router.get("/products", getProducts)
router.post("/add-product", addProduct)

export default router

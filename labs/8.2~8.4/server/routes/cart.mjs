import { Router } from "express"

import { getCart, addProductToCart } from "../controllers/cart.mjs"

const router = Router()

router.get("/", getCart)
router.post("/", addProductToCart)

export default router

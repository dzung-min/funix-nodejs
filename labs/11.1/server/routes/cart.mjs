import { Router } from "express"

import {
  getCart,
  addProductToCart,
  removeProductFromCart,
} from "../controllers/cart.mjs"

const router = Router()

router.get("/", getCart)
router.post("/", addProductToCart)
router.delete("/:productId", removeProductFromCart)

export default router

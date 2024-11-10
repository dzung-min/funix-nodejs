import { Router } from "express"

import {
  findAllProduct,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller"

const router = Router()

router.route("/").get(findAllProduct).post(createProduct)
router
  .route("/:id")
  .get(findProductById)
  .patch(updateProduct)
  .delete(deleteProduct)

export default router

import { Schema, model } from "mongoose"

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: String,
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const Product = model("Product", ProductSchema)

export default Product

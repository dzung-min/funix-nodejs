import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

export default function CartProduct({ product }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  async function handleDeleteBtnClick() {
    await axios.delete("http://localhost:3000/cart/" + product.id)
    queryClient.invalidateQueries({ queryKey: ["cart"] })
  }

  return (
    <li className="cart__item">
      <h1>{product.title}</h1>
      <h2>Quantity: {product.qty}</h2>
      <button
        className="btn danger"
        type="submit"
        onClick={handleDeleteBtnClick}
      >
        Delete
      </button>
    </li>
  )
}

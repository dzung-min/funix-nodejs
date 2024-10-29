import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

export default function Product({ product, isAdmin }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  async function addToCart(id, price) {
    await axios.post("http://localhost:3000/cart", {
      id,
      price,
    })
    navigate("/cart")
  }

  function handleEditBtnClick() {
    navigate("/admin/edit/" + product.id)
  }

  async function handleDeleteBtnClick() {
    await axios.delete("http://localhost:3000/products/" + product.id)
    queryClient.invalidateQueries(["product"])
  }

  return (
    <article className="card product-item" key={product.title}>
      <header className="card__header">
        <h1 className="product__title">{product.title}</h1>
      </header>
      <div className="card__image">
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div className="card__content">
        <h2 className="product__price">${product.price}</h2>
        <p className="product__description">{product.description}</p>
      </div>
      <div className="card__actions">
        {isAdmin ? (
          <button className="btn" onClick={handleEditBtnClick}>
            Edit
          </button>
        ) : (
          <button className="btn">Details</button>
        )}
        {isAdmin ? (
          <button className="btn" onClick={handleDeleteBtnClick}>
            Delete
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => addToCart(product.id, product.price)}
          >
            Add To Cart
          </button>
        )}
      </div>
    </article>
  )
}

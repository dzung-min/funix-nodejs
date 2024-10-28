import { useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AddProductPage() {
  const navigate = useNavigate()
  const titleInput = useRef()
  const imageUrlInput = useRef()
  const priceInput = useRef()
  const descInput = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    const title = titleInput.current.value
    const imageUrl = imageUrlInput.current.value
    const price = priceInput.current.value
    const description = descInput.current.value
    await axios.post(
      "http://localhost:3000/add-product",
      {
        title,
        imageUrl,
        price,
        description,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    titleInput.current.value = ""
    imageUrlInput.current.value = ""
    priceInput.current.value = ""
    descInput.current.value = ""
    navigate("/")
  }

  return (
    <main>
      <form class="product-form" onSubmit={handleSubmit}>
        <div class="form-control">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" ref={titleInput} />
        </div>
        <div class="form-control">
          <label for="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            ref={imageUrlInput}
          />
        </div>
        <div class="form-control">
          <label for="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            ref={priceInput}
          />
        </div>
        <div class="form-control">
          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            ref={descInput}
          ></textarea>
        </div>

        <button class="btn" type="submit">
          Add Product
        </button>
      </form>
    </main>
  )
}

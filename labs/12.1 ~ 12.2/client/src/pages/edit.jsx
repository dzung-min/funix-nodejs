import { useEffect, useRef } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

export default function EditProductPage() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const titleInput = useRef()
  const imageUrlInput = useRef()
  const priceInput = useRef()
  const descInput = useRef()

  useEffect(() => {
    async function fetchProduct() {
      const res = await axios.get("http://localhost:3000/products/" + productId)
      titleInput.current.value = res.data.title
      imageUrlInput.current.value = res.data.imageUrl
      priceInput.current.value = res.data.price
      descInput.current.value = res.data.description
    }
    fetchProduct()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const title = titleInput.current.value
    const imageUrl = imageUrlInput.current.value
    const price = priceInput.current.value
    const description = descInput.current.value
    await axios.patch("http://localhost:3000/products", {
      title,
      imageUrl,
      price,
      description,
      id: productId,
    })
    titleInput.current.value = ""
    imageUrlInput.current.value = ""
    priceInput.current.value = ""
    descInput.current.value = ""
    navigate("/admin/products")
  }

  return (
    <main>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" ref={titleInput} />
        </div>
        <div className="form-control">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            ref={imageUrlInput}
          />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            ref={priceInput}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            ref={descInput}
          ></textarea>
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </main>
  )
}

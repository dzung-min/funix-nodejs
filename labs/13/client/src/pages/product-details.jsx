import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      const res = await axios.get(
        `http://localhost:3000/products/${params.productId}`
      )
      setProduct(res.data)
    }
    fetchProduct()
  }, [])

  return (
    product && (
      <main className="centered">
        <h1>{product.title}</h1>
        <hr />
        <div className="image">
          <img src={product.imageUrl} alt={product.title} />
        </div>
        <h2>${Number(product.price).toFixed(2)}</h2>
        <p>{product.description}</p>
      </main>
    )
  )
}

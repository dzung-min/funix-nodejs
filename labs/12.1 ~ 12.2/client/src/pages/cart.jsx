import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import Loading from "../components/Loading"
import CartProductList from "../components/CartProductsList"

export default function CartPage() {
  const navigate = useNavigate()
  const { isPending, error, data } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/cart")
      return res.data
    },
  })

  if (isPending) return <Loading />

  async function handleOrderBtnClick() {
    await axios.post("http://localhost:3000/orders")
    navigate("/orders")
  }

  return data.length > 0 ? (
    <>
      <CartProductList products={data} />
      <hr />
      <div className="centered">
        <button
          type="submit"
          className="btn"
          onClick={() => handleOrderBtnClick(data)}
        >
          Order Now!
        </button>
      </div>
    </>
  ) : (
    <h2 style={{ textAlign: "center" }}>No product in cart</h2>
  )
}

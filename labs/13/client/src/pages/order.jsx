import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function OrderPage() {
  const orderQuery = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/orders")
      return res.data
    },
  })

  if (orderQuery.isFetching)
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>

  return orderQuery.data.length === 0 ? (
    <h2 style={{ textAlign: "center" }}>No order</h2>
  ) : (
    <main>
      {orderQuery.data.map((order, index) => {
        if (order.products.length === 0) return null
        return (
          <div key={order.id}>
            <h2># {order.id}</h2>
            <ul>
              {order.products.map((prod) => {
                return (
                  <li key={prod.id}>
                    {prod.title} - Qty: {prod.orderproduct.quantity}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </main>
  )
}

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import Loading from "../components/Loading"
import CartProductList from "../components/CartProductsList"

export default function CartPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/cart")
      return res.data.products
    },
  })
  if (isPending) return <Loading />
  return <CartProductList products={data} />
}

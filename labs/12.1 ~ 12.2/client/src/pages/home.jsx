import axios from "axios"
import { useQuery } from "@tanstack/react-query"

import ProductsList from "../components/ProductsList"
import Loading from "../components/Loading"

export default function HomePage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/products")
      return res.data
    },
  })

  if (isPending) return <Loading />

  return (
    <>
      {data.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No product found</h2>
      ) : (
        <ProductsList products={data} isAdmin={false} />
      )}
    </>
  )
}

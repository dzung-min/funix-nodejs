import axios from "axios"
import ProductsList from "../components/ProductsList"
import { useQuery } from "@tanstack/react-query"
import Loading from "../components/Loading"

export default function ProductsPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/products")
      return res.data
    },
  })

  if (isPending) return <Loading />
  return (
    <>
      {data.length === 0 ? (
        <h2>No product found</h2>
      ) : (
        <ProductsList products={data} />
      )}
    </>
  )
}

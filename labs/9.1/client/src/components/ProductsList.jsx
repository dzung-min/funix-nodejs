import Product from "./Product"

export default function productsList({ products }) {
  const prodList = products.map((prod) => (
    <Product key={prod.id} product={prod} />
  ))
  return <div className="grid">{prodList}</div>
}
import Product from "./Product"

export default function productsList({ products, isAdmin }) {
  const prodList = products.map((prod) => (
    <Product key={prod.id} product={prod} isAdmin={isAdmin} />
  ))
  return <div className="grid">{prodList}</div>
}

import CartProduct from "./CartProduct"

export default function CartProductList({ products }) {
  const cartProductList = products.map((product) => {
    return <CartProduct key={product.id} product={product} />
  })

  return (
    <main>
      <ul className="cart__item-list">{cartProductList}</ul>
    </main>
  )
}

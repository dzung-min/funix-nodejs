import CartProduct from "./CartProduct"

export default function cartProductList({ products }) {
  const cartProductList = products.map((product) => {
    return <CartProduct key={product.id} product={product} />
  })

  return (
    <main>
      <ul className="cart__item-list">{cartProductList}</ul>
      <hr />
      <div className="centered">
        <form action="/create-order" method="POST">
          <button type="submit" className="btn">
            Order Now!
          </button>
        </form>
      </div>
    </main>
  )
}

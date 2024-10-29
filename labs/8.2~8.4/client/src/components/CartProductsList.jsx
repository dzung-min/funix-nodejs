export default function cartProductList({ products }) {
  const cartProductList = products.map((product) => {
    return (
      <li className="cart__item" key={product.id}>
        <h1>{product.title}</h1>
        <h2>Quantity: {product.qty}</h2>
        <form action="/cart-delete-item" method="POST">
          <input type="hidden" value="<%= p._id %>" name="productId" />
          <button className="btn danger" type="submit">
            Delete
          </button>
        </form>
      </li>
    )
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

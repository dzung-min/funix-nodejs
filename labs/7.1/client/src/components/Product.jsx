export default function Product({ product }) {
  return (
    <article className="card product-item" key={product.title}>
      <header className="card__header">
        <h1 className="product__title">{product.title}</h1>
      </header>
      <div className="card__image">
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div className="card__content">
        <h2 className="product__price">${product.price}</h2>
        <p className="product__description">{product.description}</p>
      </div>
      <div className="card__actions">
        <form action="/admin/add-to-cart" method="POST">
          <input type="hidden" value={product.id} name="productId" />
          <button className="btn" type="submit">
            Add To Cart
          </button>
        </form>
      </div>
    </article>
  )
}

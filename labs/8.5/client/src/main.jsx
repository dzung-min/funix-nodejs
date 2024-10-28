import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App"
import HomePage from "./pages/home"
import ProductsPage from "./pages/products"
import "./assets/css/main.css"
import "./assets/css/product.css"
import "./assets/css/forms.css"
import "./assets/css/cart.css"
import AddProductPage from "./pages/add-product"
import CartPage from "./pages/cart"
import EditProductPage from "./pages/edit"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "add-product", element: <AddProductPage /> },
      { path: "cart", element: <CartPage /> },
      {
        path: "admin",
        children: [
          { path: "products", element: <ProductsPage isAdmin={true} /> },
          { path: "edit/:productId", element: <EditProductPage /> },
        ],
      },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

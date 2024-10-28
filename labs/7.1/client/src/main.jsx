import { createRoot } from "react-dom/client"
import { StrictMode, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App"
import HomePage from "./pages/home"
import ProductsPage from "./pages/products"
import "./assets/css/main.css"
import "./assets/css/product.css"
import "./assets/css/forms.css"
import AddProductPage from "./pages/add-product"
import axios from "axios"
import Loading from "./components/Loading"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "products",
        element: <ProductsPage />,
      },
      { path: "add-product", element: <AddProductPage /> },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

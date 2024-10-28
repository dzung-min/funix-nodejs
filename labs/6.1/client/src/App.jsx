import { Link, Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <div>
        <Link to="/">Enter User</Link>
        <Link to="/users">Users</Link>
      </div>
      <Outlet />
    </>
  )
}

export default App

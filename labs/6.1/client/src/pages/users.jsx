import { useEffect, useState } from "react"

export default function UsersPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3000/users")
      const data = await res.json()
      setUsers(data)
    }

    fetchUsers()
  }, [])

  const userList = users.map((user, index) => <li key={index}>{user}</li>)
  return (
    <>
      <h1>Users</h1>
      {users.length > 0 ? <ul>{userList}</ul> : <p>No user found</p>}
    </>
  )
}

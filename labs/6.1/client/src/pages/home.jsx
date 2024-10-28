import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const [text, setText] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: text }),
    })
    if (res.ok) {
      setText("")
      navigate("/users")
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} />
      <button type="submit">Add User</button>
    </form>
  )
}

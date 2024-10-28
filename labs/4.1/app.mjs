import express from "express"

const app = express()

app.get("/", (req, res, next) => {
  res.send("<p>The Middleware that handles just /</p>")
})
app.get("/users", (req, res, next) => {
  res.send("<p>The Middleware that handles just /users</p>")
})

app.listen(3000)

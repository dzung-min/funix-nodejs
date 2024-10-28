import express from "express"

const app = express()

app.use(express.static("public"))
app.get("/", (req, res, next) => {
  res.sendFile("views/index.html", { root: "./" })
})
app.get("/users", (req, res, next) => {
  res.sendFile("views/users.html", { root: "./" })
})
app.listen(3000)

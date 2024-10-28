import express from "express"
import cors from "cors"
import { writeFile, readFile } from "fs/promises"

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post("/users", async (req, res, next) => {
  const user = req.body
  await writeFile("user.txt", user.username + "\n", {
    flag: "a",
    encoding: "utf-8",
  })
  res.status(201).end()
})

app.get("/users", async (req, res, next) => {
  try {
    // read file "user.txt"
    const fileContent = await readFile("user.txt", "utf-8")
    // parse the string that was read from file
    const usernames = fileContent.split("\n").slice(0, -1)
    // send back to the client as json
    res.json(usernames)
  } catch (error) {
    res.json([])
  }
})

app.listen(3000)

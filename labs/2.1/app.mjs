import { createServer } from "node:http"
import { readFile, writeFile, open } from "node:fs"

const server = createServer((req, res) => {
  const url = req.url
  if (url === "/") {
    res.setHeader("conten-type", "text/html")
    res.statusCode = 200
    res.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Lab 2.1</title>
          </head>
          <body>
            <form action="/create-user" method="post">
              <label for="user">Username</label>
              <input type="text" name="user" id="user" />
              <button type="submit">Send</button>
            </form>
          </body>
        </html>
    `)
    res.end()
  }
  if (url === "/users") {
    readFile("users.txt", "utf-8", (err, data) => {
      if (err) {
        // "users.txt" is not existed (no user has ever been created)
        if (err.code === "ENOENT") {
          res.end("<p>No users found</p>")
        } else {
          res.end("<p>Something went wrong</p>")
        }
      } else {
        res.setHeader("content-type", "text/html")
        const dataArray = data.split("/n")
        // because of the last "/n", there will always be an extra empty element in
        // the returned array that needed to be removed
        const users = dataArray.slice(0, -1)

        res.write("<ul>")
        users.forEach((user) => {
          res.write(`<li>${user}</li>`)
        })
        res.end("</ul>")
      }
    })
  }
  if (url === "/create-user") {
    // the data that come from req.body will be "chunks" of Buffer
    const body = []
    req.on("data", (chunk) => {
      body.push(chunk)
    })
    req.on("end", () => {
      // parse the request body
      // the parsed body will be smt like "user=Dzung"
      const parsedBody = Buffer.concat(body).toString()
      // get the user name from parsed body
      const content = parsedBody.split("=")[1]
      // write the content to "users.txt" file then redirect to "/users"
      writeFile("users.txt", content + "/n", { flag: "a" }, () => {
        res.statusCode = 302
        res.setHeader("location", "/users")
        res.end()
      })
    })
  }
})

server.listen(3000)

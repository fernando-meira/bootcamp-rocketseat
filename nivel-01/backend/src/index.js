const express = require("express")

const app = express()
app.use(express.json())

const projects = [
  { name: "React", owner: "Fernando" },
  { name: "React Native", owner: "Fernando Meira" },
]

app.get("/projects", (request, response) => {
  return response.json(projects)
})

app.post("/projects", (request, response) => {
  const project = request.body

  projects.push(project)
  console.log(projects)

  return response.status(200).json(project)
})

app.listen(3333, () => {
  console.log("Go! 👀")
})

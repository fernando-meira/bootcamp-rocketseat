const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const projects = [];

app.get("/projects", (request, response) => {
  return response.json(projects);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = {
    id: uuidv4(),
    title,
    owner,
  };

  projects.push(project);
  console.log(project);

  return response.status(200).json(project);
});

app.listen(3333, () => {
  console.log("Go! 👀");
});

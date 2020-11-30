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
    owner,
    title,
    id: uuidv4(),
  };

  projects.push(project);

  return response.status(201).json(project);
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response
      .status(404)
      .json({ success: false, error: "Project not found." });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.status(200).json(project);
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  console.log(id);

  const projectIndex = projects.findIndex((project) => project.id === id);

  console.log(projectIndex);

  if (projectIndex < 0) {
    return response
      .status(400)
      .json({ success: false, error: "Project not found." });
  }

  projects.splice(projectIndex, 1);

  return response.status(200).send();
});

app.listen(3333, () => {
  console.log("Go! 👀");
});

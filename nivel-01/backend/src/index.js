const express = require("express");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");

const app = express();
app.use(express.json());

const projects = [];

function validateProjectId(request, response, next) {
  const { id } = request.params;

  const isUuid = uuidValidate(id);

  if (!isUuid) {
    return response.status(400).json({ error: "Invalid project ID." });
  }

  return next();
}

function logRequest(request, response, next) {
  const { method, url } = request;

  const logFormatted = `[${method.toUpperCase()}] , ${url}`;

  console.time(logFormatted);

  next();

  console.timeEnd(logFormatted);
}

app.use(logRequest);
app.use("/projects/:id", validateProjectId);

app.get("/projects", (request, response) => {
  const { title } = request.query;

  const result = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.status(200).json(result);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = {
    title,
    owner,
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
      .json({ success: false, error: "Project not found" });
  }

  const project = {
    title,
    owner,
    id,
  };

  projects[projectIndex] = project;

  return response.status(200).json(project);
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response
      .status(404)
      .json({ success: false, error: "Project not found." });
  }

  projects.splice(projectIndex, 1);

  return response
    .status(204)
    .json({ success: true, message: "Deleted project." });
});

app.listen(3333, () => {
  console.log("Go! 👀");
});

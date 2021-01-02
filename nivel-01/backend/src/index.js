const express = require("express");
const cors = require("cors");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
const { isUuid } = require("uuidv4");

const app = express();
app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  const isUuid = uuidValidate(id);

  if (!isUuid) {
    return response.status(400).json({ error: "Invalid repository ID." });
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
app.use("/repositories/:id", validateRepositoryId);

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const result = title
    ? repositories.filter((repository) => repository.title.includes(title))
    : repositories;

  return response.status(200).json(result);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  const repository = {
    url,
    title,
    techs,
    id: uuidv4(),
    likes: likes ? likes : 0,
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response
      .status(404)
      .json({ success: false, error: "repository not found" });
  }

  const repository = {
    title,
    owner,
    id,
  };

  repositories[repositoryIndex] = repository;

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response
      .status(404)
      .json({ success: false, error: "repository not found." });
  }

  repositories.splice(repositoryIndex, 1);

  response.status(204).json({ message: "Deleted reposotory." });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const uuidValidate = isUuid(id);

  if (!uuidValidate) {
    return response.status(400).json({ error: "Invalid project id." });
  }

  const repository = repositories.find((repository) => repository.id === id);

  repository.likes += 1;

  return response.status(200).json(repository);
});

app.listen(3333, () => {
  console.log("Go! 👀");
});

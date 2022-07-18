const PORT = 4000;
const express = require("express");

const server = express();
const apiRouter = require("./api");
const morgan = require("morgan");
<<<<<<< HEAD
const { client } = require("./db");
client.connect();
=======
>>>>>>> b1b5d42cfaeb7545f01e897a04eec52ff73b9646
server.use(morgan("dev"));

server.use(express.json());
server.use("/api", apiRouter);
<<<<<<< HEAD
server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});
=======

const { client } = require("./db");
client.connect();
>>>>>>> b1b5d42cfaeb7545f01e897a04eec52ff73b9646

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

// POST /api/users/register
// POST /api/users/login
// DELETE /api/users/:id

// GET /api/posts
// POST /api/posts
// PATCH /api/posts/:id
// DELETE /api/posts/:id

// GET /api/tags
// GET /api/tags/:tagName/posts

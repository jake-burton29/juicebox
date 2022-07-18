const express = require("express");
const postRouter = require("./posts");
const tagsRouter = require("./tags");
const apiRouter = express.Router();

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postRouter);
apiRouter.use("/tags", tagsRouter);
module.exports = apiRouter;

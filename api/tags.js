const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); // THIS IS DIFFERENT
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  let { tagName } = req.params;

  // decode %23happy to #happy
  tagName = decodeURIComponent(tagName);

  try {
    const allPosts = await getPostsByTagName(tagName);

    const posts = allPosts.filter((post) => {
      if (post.active && !req.user) {
        return true;
      }
      if (post.active && req.user && post.author.id === req.user.id) {
        return true;
      }

      return false;
    });

    res.send({ posts });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;

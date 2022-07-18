const express = require("express");
const postRouter = express.Router();
const { getAllPosts } = require("../db");
const { requireUser } = require("./utils");

postRouter.post("/", requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/);
  const postData = {};

  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    postData.authorId = req.params.authorId;
    postData.title = req.params.title;
    postData.content = req.params.content;
    // add authorId, title, content to postData object
    const post = await createPost(postData);
    // this will create the post and the tags for us
    // if the post comes back, res.send({ post });
    // otherwise, next an appropriate error object
    if (post) {
      res.send({ post });
    } else {
      throw error;
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

postRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); // THIS IS DIFFERENT
});

postRouter.get("/", async (req, res) => {
  const posts = await getAllPosts();

  res.send({
    posts,
  });
});

module.exports = postRouter;

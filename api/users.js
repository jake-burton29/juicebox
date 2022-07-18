const express = require("express");
const usersRouter = express.Router();
const { getAllUsers, getUserByUsername, createUser } = require("../db");
const jwt = require("jsonwebtoken");

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, name, location } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    const user = await createUser({
      username,
      password,
      name,
      location,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "thank you for signing up",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); // THIS IS DIFFERENT
});

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users,
  });
});
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      // create token & return to user
      const token = jwt.sign(
        { username: username, id: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      const recoveredData = jwt.verify(token, process.env.JWT_SECRET);
      res.send({ message: "you're logged in!", token: token, user });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = usersRouter;

//curl http://localhost:4000/api -H 'Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsYmVydCIsImlkIjoxLCJpYXQiOjE2NTgxNzU5ODIsImV4cCI6MTY1ODE3OTU4Mn0.rkuAKEFZMxx7y7k4n1DyjrPqUP7tU_g98lpkE4k_fow'

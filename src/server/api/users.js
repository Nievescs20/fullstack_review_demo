const express = require("express");
const router = express.Router();
const prisma = require("../client");
const jwt = require("jsonwebtoken");

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
  }
});

router.get("/me", async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.send({ user: "notLoggedIn" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.send({ user: "notLoggedIn" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    res.send({ user: "loggedIn" });
  } catch (error) {
    res.send({ message: "Invalid Token", user: "notLoggedIn" });
    return;
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

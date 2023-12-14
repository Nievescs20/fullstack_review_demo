const express = require("express");
const router = express.Router();
const prisma = require("../client");
const { verify } = require("../util");

router.post("/recipe/:id", verify, async (req, res, next) => {
  const { message } = req.body;
  const { id } = req.params;
  console.log("user", id);
  try {
    const comment = await prisma.comment.create({
      data: {
        message,
        userId: req.user.id,
        recipeId: +id,
      },
    });
    res.status(201).send(comment);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

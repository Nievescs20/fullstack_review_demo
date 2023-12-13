const express = require("express");
const router = express.Router();
const prisma = require("../client");
const { verify } = require("../util");

router.get("/", async (req, res, next) => {
  try {
    const recipes = await prisma.recipe.findMany();
    res.status(200).send(recipes);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: +id,
      },
    });
    res.status(200).send(recipe);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", verify, async (req, res, next) => {
  const {
    name,
    description,
    prepTime,
    cookTime,
    ingredients,
    directions,
    isGlutenFree,
  } = req.body;
  try {
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        prepTime,
        cookTime,
        ingredients,
        directions,
        isGlutenFree,
        userId: req.user.id,
      },
    });
    res.status(201).send(recipe);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

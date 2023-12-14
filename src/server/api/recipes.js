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
router.get("/favorites", verify, async (req, res, next) => {
  try {
    const recipes = await prisma.favorite.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        recipe: true,
      },
    });
    res.status(200).send(recipes);
  } catch (error) {}
});

router.post("/favorites/:id", verify, async (req, res, next) => {
  const { id } = req.params;
  try {
    const exists = await prisma.favorite.findFirst({
      where: {
        userId: req.user.id,
        recipeId: +id,
      },
    });

    if (exists) {
      console.log("already exists");
      return;
    }

    const fav = await prisma.favorite.create({
      data: {
        userId: req.user.id,
        recipeId: +id,
      },
    });
    res.status(201).send(fav);
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
      include: {
        Like: true,
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

router.post("/like/:id", verify, async (req, res, next) => {
  const { id } = req.params;
  try {
    const exists = await prisma.like.findFirst({
      where: {
        userId: req.user.id,
        recipeId: +id,
      },
    });

    if (exists) {
      console.log("exists already");
      return;
    }

    const like = await prisma.like.create({
      data: {
        userId: req.user.id,
        recipeId: +id,
      },
    });
    res.status(201).send(like);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

const prisma = require("./src/server/client");
const bcrypt = require("bcrypt");

const users = [
  { username: "bob", password: "123" },
  { username: "bob", password: "123" },
  { username: "bob", password: "123" },
];

async function seed() {
  const bob = await prisma.user.create({
    data: {
      username: "bob",
      password: await bcrypt.hash("123", 5),
    },
  });

  const jill = await prisma.user.create({
    data: {
      username: "jill",
      password: await bcrypt.hash("123", 5),
    },
  });

  const sarah = await prisma.user.create({
    data: {
      username: "sarah",
      password: await bcrypt.hash("123", 5),
    },
  });

  const yumYumSauce = await prisma.recipe.create({
    data: {
      name: "Yum Yum Sauce",
      description: "Yummmmmmy",
      prepTime: 10,
      cookTime: 0,
      ingredients: "tomato paste, mayonaise, salt, pepper, rice vinegar",
      directions: "put ingredients in bowl. whisk until combined",
      isGlutenFree: true,
      userId: bob.id,
    },
  });

  const pbj = await prisma.recipe.create({
    data: {
      name: "peanut butter and jelly sammy",
      description: "smooth and silky",
      prepTime: 2,
      cookTime: 0,
      ingredients: "bread, smooth pb, strawberry jelly",
      directions: "slap on bread, slap together, eat",
      isGlutenFree: false,
      userId: jill.id,
    },
  });

  const macNCheese = await prisma.recipe.create({
    data: {
      name: "Mac N Cheese",
      description: "liquid gold",
      prepTime: 0,
      cookTime: 10,
      ingredients: "noodles, cheese",
      directions: "boil noodles, add cheese and stir",
      isGlutenFree: false,
      userId: sarah.id,
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      message: "Delicious, I loved it!!",
      userId: jill.id,
      recipeId: pbj.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      message: "Not very good at all. Boooo",
      userId: bob.id,
      recipeId: macNCheese.id,
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      message: "Was okay",
      userId: sarah.id,
      recipeId: yumYumSauce.id,
    },
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

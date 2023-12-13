import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  console.log("recipes", recipes);

  useEffect(() => {
    async function getRecipes() {
      try {
        const { data: foundRecipes } = await axios.get("/api/recipes");
        setRecipes(foundRecipes);
      } catch (error) {
        console.error(error);
      }
    }
    getRecipes();
  }, []);

  return (
    <div>
      <h2>All Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ border: "2px solid black" }}>
          <Link to={`/${recipe.id}`}>
            <h3>Name: {recipe.name}</h3>
          </Link>
          <h3>Description: {recipe.description}</h3>
          <h3>Prep Time: {recipe.prepTime}</h3>
          <h3>Cook Time: {recipe.cookTime}</h3>
          <h3>Ingredients: {recipe.ingredients}</h3>
          <h3>Directions: {recipe.directions}</h3>
          <h3>Gluten Free: {recipe.isGlutenFree ? "Yes" : "No"}</h3>
        </div>
      ))}
    </div>
  );
}

export default AllRecipes;

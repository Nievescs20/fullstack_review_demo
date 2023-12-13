import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  console.log("recipe", recipe);

  useEffect(() => {
    async function getRecipe() {
      try {
        const { data: foundRecipe } = await axios.get(`/api/recipes/${id}`);
        setRecipe(foundRecipe);
      } catch (error) {
        console.error(error);
      }
    }
    getRecipe();
  }, []);

  if (!recipe.id) {
    return <div>loading...</div>;
  }

  return (
    <div style={{ border: "2px solid black" }}>
      <h3>Name: {recipe.name}</h3>
      <h3>Description: {recipe.description}</h3>
      <h3>Prep Time: {recipe.prepTime}</h3>
      <h3>Cook Time: {recipe.cookTime}</h3>
      <h3>Ingredients: {recipe.ingredients}</h3>
      <h3>Directions: {recipe.directions}</h3>
      <h3>Gluten Free: {recipe.isGlutenFree ? "Yes" : "No"}</h3>
    </div>
  );
}

export default SingleRecipe;

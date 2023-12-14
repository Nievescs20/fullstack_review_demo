import React, { useState } from "react";
import axios from "axios";

function CreateRecipe() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [glutenFree, setGlutenFree] = useState(false);

  async function handleCreateRecipe() {
    try {
      const { data } = await axios.post(
        "/api/recipes",
        {
          name,
          description,
          prepTime: +prepTime,
          cookTime: +cookTime,
          ingredients,
          directions,
          isGlutenFree: glutenFree,
        },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Create Recipe</h2>
      <div>
        <label>Recipe Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label>Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Prep Time</label>
        <input
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
        />
        <label>Cook Time</label>
        <input
          type="number"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
        />
        <label>Ingredients</label>
        <input
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <label>Directions</label>
        <input
          value={directions}
          onChange={(e) => setDirections(e.target.value)}
        />
        <label>Is It Gluten Free</label>
        <input
          type="checkbox"
          value={glutenFree}
          onChange={() => {
            glutenFree ? setGlutenFree(false) : setGlutenFree(true);
          }}
        />
        <button onClick={handleCreateRecipe}>Create Recipe</button>
      </div>
    </div>
  );
}

export default CreateRecipe;

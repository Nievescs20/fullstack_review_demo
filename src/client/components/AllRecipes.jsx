import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllRecipes() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const filtered = recipes.filter(
    (recipe) =>
      recipe.name.includes(search) || recipe.ingredients.includes(search)
  );

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
      <input
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setSearch("")}>X</button>
      <div id="all_recipes_container">
        {search.length == 0
          ? recipes.map((recipe) => (
              <div key={recipe.id} style={{ border: "2px solid black" }}>
                <Link to={`/${recipe.id}`}>
                  <h3>Name: {recipe.name}</h3>
                </Link>
                <h3>Description: {recipe.description}</h3>
              </div>
            ))
          : filtered.map((recipe) => (
              <div key={recipe.id} style={{ border: "2px solid black" }}>
                <Link to={`/${recipe.id}`}>
                  <h3>Name: {recipe.name}</h3>
                </Link>
                <h3>Description: {recipe.description}</h3>
              </div>
            ))}
      </div>
    </div>
  );
}

export default AllRecipes;

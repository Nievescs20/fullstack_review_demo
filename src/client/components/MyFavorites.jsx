import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyFavorites() {
  const [favorites, setFavorites] = useState([]);
  console.log("favorites", favorites);
  useEffect(() => {
    async function getFavorites() {
      try {
        const { data: favorites } = await axios.get("/api/recipes/favorites", {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        });
        setFavorites(favorites);
      } catch (error) {
        console.error(error);
      }
    }
    getFavorites();
  }, []);

  return (
    <div>
      <h2>My Favorites</h2>
      <div>
        {favorites.map((favorite) => (
          <div key={favorite.id}>
            <Link to={`/${favorite.recipe.id}`}>
              <h3>Name: {favorite.recipe.name}</h3>
              <h3>Description: {favorite.recipe.description}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyFavorites;

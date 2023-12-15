import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

function SingleRecipe() {
  const { id } = useParams();
  const location = useLocation();
  console.log("location", location);
  const [recipe, setRecipe] = useState({});
  console.log("recipe", recipe);
  const [message, setMessage] = useState("");

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

  async function handleCreateComment() {
    try {
      const { data: comment } = await axios.post(
        `/api/comments/recipe/${id}`,
        { message },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        }
      );
      setRecipe({ ...recipe, Comment: [...recipe.Comment, comment] });
      console.log("comment", comment);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateLike() {
    try {
      const { data: like } = await axios.post(
        `/api/recipes/like/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        }
      );
      setRecipe({ ...recipe, Like: [...recipe.Like, like] });
    } catch (error) {
      console.error(error);
    }
  }

  if (!recipe.id) {
    return <div>loading...</div>;
  }

  async function handleAddToFav() {
    try {
      const { data: fav } = await axios.post(
        `/api/recipes/favorites/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        }
      );
      console.log("favorite", fav);
    } catch (error) {}
  }

  return (
    <div>
      <div>
        <h3>Name: {recipe.name}</h3>
        <h3>Description: {recipe.description}</h3>
        <h3>Prep Time: {recipe.prepTime}</h3>
        <h3>Cook Time: {recipe.cookTime}</h3>
        <h3>Ingredients: {recipe.ingredients}</h3>
        <h3>Directions: {recipe.directions}</h3>
        <h3>Gluten Free: {recipe.isGlutenFree ? "Yes" : "No"}</h3>
        <h3>Likes#: {recipe.Like.length}</h3>
        <h3 onClick={handleCreateLike}>👍🏼</h3>
        <button onClick={handleAddToFav}>Add To Favorites</button>

        <a
          href={`mailto:?subject=I wanted you to see this recipe&body=Check out this site localhost:3000${location.pathname}.&
   title=Share by Email`}
        >
          <button>Share</button>
        </a>
      </div>
      <hr />
      <div>
        <h3>Have a comment about this recipe?</h3>
        <input
          placeholder="add your comment here..."
          value={message}
          type=""
          onChange={(e) => setMessage(e.target.value)}
          style={{ height: "75px", width: "250px" }}
        />
        <button onClick={handleCreateComment}>Add Comment</button>
      </div>
      <div>
        {recipe.Comment.map((comment) => (
          <div
            key={comment.id}
            style={{ border: "2px solid black", padding: "4px" }}
          >
            <h3>{comment.message}</h3>
            <h5>{comment.createdAt.slice(0, 10)}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleRecipe;

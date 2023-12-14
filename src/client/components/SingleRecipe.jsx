import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [message, setMessage] = useState("");
  console.log("message", message);

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
      console.log("comment", comment);
    } catch (error) {
      console.error(error);
    }
  }

  if (!recipe.id) {
    return <div>loading...</div>;
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
    </div>
  );
}

export default SingleRecipe;

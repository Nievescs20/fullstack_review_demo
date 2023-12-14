import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AllRecipes from "./components/AllRecipes";
import SingleRecipe from "./components/SingleRecipe";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateRecipe from "./components/CreateRecipe";
import axios from "axios";

function App() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("TOKEN"));

  useEffect(() => {
    async function getMe() {
      const { data } = await axios.get("/api/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data.user);
    }
    getMe();
  }, [token]);

  return (
    <div className="App">
      <Navbar user={user} setToken={setToken} />
      {user === "loggedIn" ? (
        <Routes>
          <Route path="/" element={<AllRecipes />} />
          <Route path="/:id" element={<SingleRecipe />} />
          <Route path="/createrecipe" element={<CreateRecipe />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AllRecipes />} />
          <Route path="/:id" element={<SingleRecipe />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

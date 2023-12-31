import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AllRecipes from "./components/AllRecipes";
import SingleRecipe from "./components/SingleRecipe";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateRecipe from "./components/CreateRecipe";
import axios from "axios";
import MyFavorites from "./components/MyFavorites";

function App() {
  const [user, setUser] = useState("");
  console.log("user", user);
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
          <Route index path="/" element={<AllRecipes />} />
          <Route path="/:id" element={<SingleRecipe />} />
          <Route path="/createrecipe" element={<CreateRecipe />} />
          <Route path="/favorites" element={<MyFavorites />} />
          {/* <Route  element={<Navigate to="/" replace={true} />} /> */}
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AllRecipes />} />
          <Route path="/:id" element={<SingleRecipe />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          {/* <Route path="*" element={<Navigate to="/" replace={true} />} /> */}
        </Routes>
      )}
    </div>
  );
}

export default App;

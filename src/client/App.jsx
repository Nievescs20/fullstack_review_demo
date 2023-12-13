import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllRecipes from "./components/AllRecipes";
import SingleRecipe from "./components/SingleRecipe";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<AllRecipes />} />
        <Route path="/:id" element={<SingleRecipe />} />
      </Routes>
    </div>
  );
}

export default App;

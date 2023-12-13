import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  console.log("Search", search);

  return (
    <div>
      <Link to="/">
        <button>All Recipes</button>
      </Link>
      <input
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => console.log("clicked login")}>Login</button>
    </div>
  );
}

export default Navbar;

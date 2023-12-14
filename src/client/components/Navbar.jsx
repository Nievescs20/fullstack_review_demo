import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, setToken }) {
  function handleLogout() {
    window.localStorage.removeItem("TOKEN");
    setToken("");
  }

  return (
    <div>
      {user === "loggedIn" ? (
        <div>
          <Link to="/">
            <button>All Recipes</button>
          </Link>
          <Link to="/createrecipe">
            <button>Create Recipe</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {" "}
          <Link to="/">
            <button>All Recipes</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;

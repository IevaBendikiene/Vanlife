import React from "react";
import { NavLink, Link } from "react-router-dom";
import Avatar from "../assets/images/avatar-icon.png";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const handleClick = (e) => {
    logout();
  };
  const { user } = useAuthContext();
  return (
    <div className="navbar">
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink
          to="/host"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          Vans
        </NavLink>
        {user && (
          <div>
            <button onClick={handleClick}>Logout</button>
          </div>
        )}
        {!user && (
          <Link to="/login" className="login-link">
            <img src={Avatar} className="login-icon" />
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

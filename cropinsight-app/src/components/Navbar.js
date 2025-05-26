import React from "react";
import "../styles/Navbar.css";       // In Navbar.js

const Navbar = () => {
  return React.createElement(
    "nav",
    { className: "navbar" },
    React.createElement("div", { className: "logo" }, "CROP ANALYSIS"),
    React.createElement(
      "ul",
      { className: "nav-links" },
      React.createElement("li", null, React.createElement("a", { href: "/" }, "HOME")),
      React.createElement("li", null, React.createElement("a", { href: "/gallery" }, "GALLERY")),
      React.createElement("li", null, React.createElement("a", { href: "/about" }, "ABOUT")),
      React.createElement("li", null, React.createElement("a", { href: "/login" }, "LOGIN"))
    )
  );
};

export default Navbar;

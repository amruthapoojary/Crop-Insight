import React from "react";
import "../styles/HeroSection.css"; // In HeroSection.js


const HeroSection = () => {
  return React.createElement(
    "div",
    { className: "hero-section" },
    React.createElement("h1", null, "Crop Analysis"),
    React.createElement(
      "p",
      null,
      "Analyze crops effectively and make informed decisions."
    ),
    React.createElement(
      "div",
      { className: "search-bar" },
      React.createElement("input", {
        type: "text",
        placeholder: "Search crops...",
      }),
      React.createElement("button", null, "Search")
    )
  );
};

export default HeroSection;

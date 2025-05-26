import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Import the Carousel CSS file

const Carousel = ({ onSearch }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const slides = [
    {
      image: "https://wallpapercave.com/wp/wp3115809.jpg",
      content: (
        <div className="search-container">
          <h3 style={{ fontSize: "2rem", color: "white" }}>
            Discover how to optimize crop production with advanced analytics!
          </h3>
          <p style={{ fontSize: "1.2rem", color: "white", marginTop: "20px" ,textAlign: "justify"}}>
            Unlock the full potential of your crops with data-driven insights! Discover how analytics can transform your farming practices!
          </p>
          <div className="text-center mt-4">
            <a
              href="/login"
              className="btn"
              style={{
                padding: "10px 25px",
                backgroundColor: "#28a745", /* Green button */
                color: "white", /* White text */
                fontSize: "1.25rem",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                textDecoration: "none", /* Remove underline from links */
                marginTop: "20px",
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      ),
    },
    {
      image: "https://wallpaperaccess.com/full/3543885.jpg",
      content: (
        <>
          <h3 style={{ fontSize: "2rem", color: "white" }}>
            Explore New Crops for Your Region!
          </h3>
          <p style={{ fontSize: "1.2rem", color: "white", marginTop: "20px",textAlign: "justify" }}>
            Learn about the best crops suited for your region, and find out how to manage your agricultural efforts efficiently. Our platform helps you select crops that will thrive, saving time and resources.
          </p>
        </>
      ),
    },
    {
      image: "https://wallpaperbat.com/img/319677-agriculture-desktop-wallpaper.jpg",
      content: (
        <>
          <h3 style={{ fontSize: "2rem", color: "white" }}>
            Boost Your Yield with Expert Insights!
          </h3>
          <p style={{ fontSize: "1.2rem", color: "white", marginTop: "18px" ,textAlign: "justify"}}>
            Maximize your crop production by understanding the best farming practices, irrigation methods, and weather conditions. We provide expert insights to help you grow more efficiently and sustainably.
          </p>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 3000); // Automatically slide every 3 seconds
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, slides.length]);

  return (
    <div id="carouselExampleControls" className="carousel slide">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            key={index}
          >
            <img
              className="d-block w-100 carousel-img"
              src={slide.image}
              alt={`Slide ${index + 1}`}
            />
            <div className="carousel-caption">
              <div className="content-container">{slide.content}</div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;

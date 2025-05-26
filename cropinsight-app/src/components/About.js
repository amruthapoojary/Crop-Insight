import React from 'react';
import "../styles/App.css";

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
      </header>

      <section className="about-content">
        <div className="about-description">
          <h2>Crop Analysis</h2>
          <p style={{ textAlign: "justify" }}>
            Our Crop Analysis website is designed to help farmers and researchers analyze crops effectively. It provides insights into crops grown, the seasons they are cultivated, suitable weather conditions, soil types, and more. This platform serves as a learning and exploration tool to understand agricultural patterns and improve farming practices.
          </p>
        </div>
        <div className="about-image">
          <img
            src="https://media.istockphoto.com/id/1183803820/photo/group-of-school-children-with-teacher-on-field-trip-in-nature-learning-science.jpg?s=612x612&w=0&k=20&c=bVUAikVLGkCoJ21g7WTlN1wD6etDwDBcp5LX_Rq7UOI="
            alt="Crop Analysis Illustration"
          />
        </div>
      </section>

      <section className="about-creative-features">
        <h2>Features of Our Website</h2>
        <div className="feature-item">
          <i className="fas fa-seedling"></i>
          <h3>Crop Information</h3>
          <p >Detailed crop info based on seasons, soil types, and more.</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-cloud-sun"></i>
          <h3>Weather Conditions</h3>
          <p>Learn about the best weather conditions for various crops.</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-chart-line"></i>
          <h3>Improving Yield</h3>
          <p>Use data to enhance crop yield and optimize farming.</p>
        </div>
      </section>
    </div>
  );
};

export default About;

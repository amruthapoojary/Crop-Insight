import React from "react";
import "../styles/Gallery.css";     // In Gallery.js
const Gallery = () => {

    const crops = [
      { 
        name: "Wheat", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Golden_Wheat_Field.jpg/1200px-Golden_Wheat_Field.jpg", 
        details: "Wheat is a staple crop grown worldwide. It is an essential food source and is widely cultivated in Bellary due to its adaptability to the region's climate."
      },
      { 
        name: "Rice", 
        image: "https://media.istockphoto.com/id/481869420/photo/autumn-rice.jpg?s=612x612&w=0&k=20&c=SbuJe7ZJnV4PxWHOLBW08fIdouKLmFyH_57u2s6r8fU=", 
        details: "Rice is a primary food source for over half of the world's population. In Bellary, it is cultivated primarily during the monsoon season."
      },
      { 
        name: "Corn", 
        image: "https://t4.ftcdn.net/jpg/05/20/79/65/360_F_520796531_8D04Fr8dOEeyrmUly6q32Cx1BJDvr48V.jpg", 
        details: "Corn is used for food, animal feed, and biofuel production. Bellary's farmers grow it during the summer months."
      },
      { 
        name: "Cotton", 
        image: "https://static.vecteezy.com/system/resources/previews/034/900/294/non_2x/delicate-cotton-fields-ready-to-be-gathered-generative-ai-photo.jpg", 
        details: "Cotton is a major cash crop used for making fabric and textiles. Bellary is known for its high-quality cotton production."
      },
      { 
        name: "Jowar", 
        image: "https://img.freepik.com/premium-photo/jowar-grain-field_54391-180.jpg", 
        details: "Jowar is a drought-resistant grain used in food and fodder. It is one of the staple crops grown extensively in Bellary's arid regions."
      },
      { 
        name: "Sunflower", 
        image: "https://t3.ftcdn.net/jpg/02/21/84/08/360_F_221840829_vuo3acmHTQSEFXiggcMBaDU0b8Sc6bSr.jpg", 
        details: "Sunflower is grown for its seeds, which are used in cooking oil. The sunny weather in Bellary makes it ideal for sunflower cultivation."
      },
      { 
        name: "Groundnut", 
        image: "https://media.istockphoto.com/id/478066115/photo/peanuts-fields.jpg?s=612x612&w=0&k=20&c=7FTZz-ymxe4zCaWA_A7DbAMkBsYV1kNUmJsS8UIxe5I=", 
        details: "Groundnut, also known as peanuts, is a legume grown for its edible seeds. Bellary's farmers grow groundnut for both local consumption and export."
      },
      { 
        name: "Onion", 
        image: "https://t3.ftcdn.net/jpg/06/35/94/02/360_F_635940215_Bh883aQqRUMvZlHEJeIIdais1DCkXGSe.jpg", 
        details: "Onion is a widely used vegetable in cooking for its flavor and aroma. In Bellary, onions are grown in the cooler months for higher yields."
      }
    ];
    
   

  const [selectedCrop, setSelectedCrop] = React.useState(null);

  const closeModal = () => setSelectedCrop(null);

  return React.createElement(
    "div",
    { className: "gallery-section" },
    React.createElement("h2", { className: "gallery-title" }, "Crop Gallery"),
    React.createElement(
      "div",
      { className: "gallery-images" },
      crops.map((crop, index) =>
        React.createElement("div", { className: "gallery-item", key: index },
          React.createElement("img", { src: crop.image, alt: crop.name }),
          React.createElement(
            "button",
            { className: "gallery-button", onClick: () => setSelectedCrop(crop) },
            crop.name
          )
        )
      )
    ),
    selectedCrop &&
      React.createElement(
        "div",
        { className: "modal-overlay", onClick: closeModal },
        React.createElement(
          "div",
          { className: "modal-content", onClick: (e) => e.stopPropagation() },
          React.createElement("img", { src: selectedCrop.image, alt: selectedCrop.name, className: "crop-image" }),
          React.createElement("h3", { className: "crop-name" }, selectedCrop.name),
          React.createElement("p", { className: "crop-description" }, selectedCrop.details),
          React.createElement(
            "button",
            { className: "close-button", onClick: closeModal },
            "Close"
          )
        )
      )
  );
};


export default Gallery;

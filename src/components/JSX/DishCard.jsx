import React, { useState } from 'react';
import '../CSS/DishCard.css';

const DishCard = ({ dish }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(!flipped);

  return (
    
    <div className={`dish-card dish-card-container ${flipped ? 'flipped' : ''}`}>
      
      
      <div className="flip-inner">

        {/* Parte frontal */}
        <div className="flip-front">
          <img src={dish.image} alt={dish.name} />
          <div className="dish-info">
            <h3>{dish.name}</h3>
            <p className="price">S/.{dish.price}</p>
          </div>
          <button className="more-info-btn" onClick={handleFlip}>
            Más Información
          </button>
        </div>

        {/* Parte trasera */}
        <div className="flip-back">
          <div className="dish-info">
            <h3>Preparación de {dish.name}</h3>
            <p>{dish.description}</p>
            <ul>
              {dish.ingredients.map((i, index) => (
                <li key={index}>{i}</li>
              ))}
            </ul>
            <p>{dish.preparation}</p>
          </div>
          <button className="back-btn" onClick={handleFlip}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
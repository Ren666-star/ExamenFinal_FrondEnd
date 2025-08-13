import React from 'react';
import '../../pages/CSS/Reservation.css';

const TableCard = ({ table, isSelected, isReserved, onSelect }) => {
  return (
    <div className={`table-card ${isSelected ? 'selected' : ''} ${isReserved ? 'reserved' : ''}`}>
      <img 
        src={table.image} 
        alt={`Mesa ${table.id}`} 
        style={{ width: '100%', borderRadius: '8px' }} 
      />
      <div className="table-info">
        <p>Mesa {table.id}</p>
        {isReserved && <span className="reserved-text">Reservada</span>}
      </div>
      {!isReserved && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <button 
            className={`table-button ${isSelected ? 'selected' : ''}`}
            onClick={onSelect}
          >
            {isSelected ? 'Seleccionada' : 'Seleccionar mesa'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TableCard;

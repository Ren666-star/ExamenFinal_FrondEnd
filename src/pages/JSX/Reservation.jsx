import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import Navbar from '../../components/JSX/Navbar';
import TableCard from '../../components/JSX/TableCard';
import '../CSS/Reservation.css';

// Usamos variable de entorno para la URL base
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const Reservation = () => {
  const navigate = useNavigate();

  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('19:00');
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservedTables, setReservedTables] = useState([]);

  const formatDate = (date) => date.toISOString().split('T')[0];

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch(`${API_URL}/reservas`);
        const data = await res.json();
        setReservedTables(data);
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      }
    };
    fetchReservas();
  }, [selectedDate, selectedTime]);

  const handleTableSelect = (tableId) => {
    const yaReservada = reservedTables.some(r =>
      r.fecha === formatDate(selectedDate) &&
      r.hora === selectedTime &&
      parseInt(r.mesa) === tableId
    );
    if (yaReservada) return;
    setSelectedTable(tableId);
  };

  const handleReserve = async () => {
    if (!selectedTable) return;

    const nuevaReserva = {
      fecha: formatDate(selectedDate),
      hora: selectedTime,
      mesa: selectedTable,
      comensales: guests
    };

    try {
      const res = await fetch(`${API_URL}/reservas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaReserva)
      });

      if (!res.ok) throw new Error('Error al guardar la reserva');

      const reservaGuardada = await res.json();
      navigate('/confirmacion', { state: reservaGuardada });

    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      alert('No se pudo realizar la reserva');
    }
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const tables = [
    { id: 1, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" },
    { id: 2, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" },
    { id: 3, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" },
    { id: 4, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" },
    { id: 5, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" },
    { id: 6, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" }
  ];

  const availableTimes = [];
  for (let hour = 12; hour <= 22; hour++) {
    availableTimes.push(`${hour}:00`);
    if (hour < 22) availableTimes.push(`${hour}:30`);
  }

  return (
    <div className="reservation-page">
      <Navbar />
      <div className="restaurant-info">
        <h2>Reserva tu experiencia culinaria</h2>
        <p>En nuestro restaurante, cada plato es una celebración de sabor. Disfruta de una cocina exquisita en un ambiente acogedor.</p>
      </div>

      <div className="reservation-form">
        <div className="form-group">
          <label>Elige la cantidad de clientes</label>
          <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}>
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Selecciona una fecha</label>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <p>Fecha seleccionada: {selectedDate?.toLocaleDateString()}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              locale={es}
              minDate={new Date()}
              maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
              filterDate={isWeekday}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Selecciona una hora</label>
          <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
            {availableTimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <h3>Selecciona una mesa</h3>
      <div className="tables-grid">
        {tables.map(table => {
          const isReserved = reservedTables.some(r =>
            r.fecha === formatDate(selectedDate) &&
            r.hora === selectedTime &&
            parseInt(r.mesa) === table.id
          );

          return (
            <TableCard 
              key={table.id}
              table={table}
              isSelected={selectedTable === table.id}
              isReserved={isReserved}
              onSelect={() => handleTableSelect(table.id)}
            />
          );
        })}
      </div>

      <div className="action-buttons">
        <button className="back-button" onClick={() => navigate('/menu')}>Regresar</button>
        <button className="continue-button" onClick={handleReserve} disabled={!selectedTable}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Reservation;

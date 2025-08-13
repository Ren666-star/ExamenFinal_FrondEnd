import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RESERVAS_URL } from '../../config';
import '../CSS/GraciasReserva.css';

const GraciasReserva = () => {
  const navigate = useNavigate();
  const { state, search } = useLocation();
  const [datos, setDatos] = useState(state || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const query = new URLSearchParams(search);
  const reservaId = query.get('id');

  useEffect(() => {
    if (datos) {
      setLoading(false);
      return;
    }

    if (!reservaId) {
      navigate('/menu');
      return;
    }

    fetch(`${RESERVAS_URL}/${reservaId}`)
      .then(res => res.json())
      .then(data => {
        setDatos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('No se pudo cargar la reserva.');
        setLoading(false);
      });
  }, [reservaId, navigate, datos]);

  if (loading) return <p>Cargando reserva...</p>;
  if (error) return <p>{error}</p>;
  if (!datos) return null;

  const { cliente, fecha, hora, mesa, comensales, correo } = datos;
  const fechaFormateada = new Date(fecha).toLocaleDateString('es-PE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="gracias-container">
      <div className="gracias-box">
        <h1>¡Gracias por tu reserva, {cliente}!</h1>
        <p>Tu reserva ha sido confirmada correctamente.</p>

        <div className="reserva-details">
          <h2>Detalles de tu reserva:</h2>
          <p><strong>Fecha:</strong> {fechaFormateada}</p>
          <p><strong>Hora:</strong> {hora}</p>
          <p><strong>Mesa:</strong> {mesa}</p>
          <p><strong>Personas:</strong> {comensales}</p>
        </div>

        <p>Hemos enviado un correo de confirmación a {correo || 'tu correo'}</p>

        <button className="salir-btn" onClick={() => navigate('/menu')}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default GraciasReserva;

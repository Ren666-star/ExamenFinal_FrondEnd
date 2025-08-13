import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar_Confirmacion from '../../components/JSX/Navbar_Confirmacion';
import '../CSS/Confirmacion.css';
import { RESERVAS_URL } from '../../config'; // ✅ URL base desde config

const Confirmacion = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [reserva, setReserva] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    notas: ''
  });

  useEffect(() => {
    if (location.state) {
      setReserva(location.state);
    } else {
      navigate('/reservas');
    }
  }, [location.state, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const validarTelefono = (telefono) => /^[0-9]{9}$/.test(telefono);
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleConfirmar = async () => {
    const { nombre, apellido, telefono, correo } = formulario;

    if (!nombre || !apellido || !telefono || !correo) {
      alert('Completa todos los campos obligatorios.');
      return;
    }

    if (!validarTelefono(telefono)) {
      alert('El teléfono debe tener exactamente 9 dígitos.');
      return;
    }

    if (!validarEmail(correo)) {
      alert('Ingresa un correo electrónico válido.');
      return;
    }

    const reservaFinal = {
      ...reserva,
      cliente: `${nombre} ${apellido}`,
      telefono,
      correo,
      notas: formulario.notas
    };

    try {
      const res = await fetch(`${RESERVAS_URL}/${reserva.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservaFinal)
      });

      if (!res.ok) throw new Error('No se pudo confirmar la reserva');

      navigate('/gracias', { state: reservaFinal });
    } catch (error) {
      console.error('Error al confirmar reserva:', error);
      alert('Error al confirmar la reserva');
    }
  };

  if (!reserva) return null;

  return (
    <div className="confirmacion-page">
      <Navbar_Confirmacion />
      <div className="restaurant-info">
        <h2>Confirmación de Reserva</h2>
        <p>Por favor, completa tus datos para confirmar tu reserva.</p>
      </div>

      <div className="confirmacion-form">
        <div className="form-group resumen">
          <h3>Resumen de la Reserva</h3>
          <p><strong>Fecha:</strong> {reserva.fecha}</p>
          <p><strong>Hora:</strong> {reserva.hora}</p>
          <p><strong>Personas:</strong> {reserva.comensales}</p>
          <p><strong>Mesa:</strong> {reserva.mesa}</p>
        </div>

        <div className="form-group">
          <h2>Datos del Cliente</h2>
          <div className="input-group">
            <h3>Nombre:</h3>
            <input name="nombre" value={formulario.nombre} onChange={handleInputChange} placeholder="Nombre*" />
          </div>
          <div className="input-group">
            <h3>Apellido:</h3>
            <input name="apellido" value={formulario.apellido} onChange={handleInputChange} placeholder="Apellido*" />
          </div>
          <div className="input-group">
            <h3>Teléfono:</h3>
            <input name="telefono" value={formulario.telefono} onChange={handleInputChange} placeholder="Teléfono*" maxLength="9" />
          </div>
          <div className="input-group">
            <h3>Correo Electrónico:</h3>
            <input name="correo" value={formulario.correo} onChange={handleInputChange} placeholder="Correo Electrónico*" />
          </div>
          <div className="input-group">
            <h3>Notas:</h3>
            <textarea name="notas" value={formulario.notas} onChange={handleInputChange} rows="3" placeholder="Notas adicionales" />
          </div>
          <div className="input-group">
            <h3>Hora de Reserva:</h3>
            <input
              name="hora"
              type="time"
              value={reserva.hora}
              onChange={handleInputChange}
              min="11:00"
              max="22:00"
            />
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="back-button" onClick={() => navigate('/reservas')}>Volver</button>
        <button className="continue-button" onClick={handleConfirmar}>Confirmar Reserva</button>
      </div>
    </div>
  );
};

export default Confirmacion;

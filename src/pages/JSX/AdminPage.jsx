import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AdminPage.css';
import Navbar from '../../components/JSX/Navbar';
import axios from 'axios';
import { RESERVAS_URL } from '../../config';

const AdminPage = () => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [reservas, setReservas] = useState({});
  const [todasLasReservas, setTodasLasReservas] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentReserva, setCurrentReserva] = useState(null);
  const [formData, setFormData] = useState({
    mesa: '',
    comensales: '',
    fecha: selectedDate,
    hora: '',
    cliente: '',
    telefono: '',
    correo: '',
    notas: ''
  });

  const cargarReservas = async () => {
    try {
      const res = await axios.get(RESERVAS_URL);
      const reservasBackend = res.data;
      setTodasLasReservas(reservasBackend);

      const agrupadas = {};
      reservasBackend.forEach(r => {
        if (!agrupadas[r.fecha]) agrupadas[r.fecha] = [];
        agrupadas[r.fecha].push(r);
      });
      setReservas(agrupadas);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = (firstDayOfMonth + 6) % 7;
    const calendar = [];
    let dayCounter = 1 - startDay;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (dayCounter < 1 || dayCounter > daysInMonth) {
          week.push(null);
        } else {
          week.push(dayCounter);
        }
        dayCounter++;
      }
      calendar.push(week);
    }
    return calendar;
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const formattedDate = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
    setSelectedDate(formattedDate);
  };

  const openModal = (type, reserva = null) => {
    setModalType(type);
    setCurrentReserva(reserva);
    if (type === 'edit' && reserva) setFormData({ ...reserva });
    else setFormData({ mesa:'', comensales:'', fecha:selectedDate, hora:'', cliente:'', telefono:'', correo:'', notas:'' });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservaData = { ...formData, mesa: Number(formData.mesa) };
    try {
      if (modalType === 'create') await axios.post(RESERVAS_URL, reservaData);
      else if (modalType === 'edit' && currentReserva) await axios.put(`${RESERVAS_URL}/${currentReserva.id}`, reservaData);

      await cargarReservas();
      setShowModal(false);
    } catch (error) {
      console.error("Error al guardar reserva:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${RESERVAS_URL}/${currentReserva.id}`);
      await cargarReservas();
      setShowModal(false);
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
    }
  };

  const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const weeks = generateCalendar();

  return (
    <div className="admin-container">
      <Navbar />
      <div className="top-panel">
        <h2>Panel de Administración</h2>
        <button className="logout-btn" onClick={() => navigate('/')}>Cerrar Sesión</button>
      </div>

      <div className="calendar-container">
        <div className="calendar-nav">
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>

        <div className="calendar-header">
          <div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div><div>Dom</div>
        </div>

        {weeks.map((week,i) => (
          <div key={i} className="calendar-week">
            {week.map((day,j) => {
              const dateStr = day ? `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}` : '';
              const hasReservations = day && reservas[dateStr]?.length > 0;
              return (
                <div
                  key={j}
                  className={`calendar-day ${hasReservations ? 'has-reservations' : ''}`}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="reservas-container">
        <div className="reservas-header">
          <h3>Reservas para {selectedDate}</h3>
          <button onClick={() => openModal('create')}>Nueva Reserva</button>
        </div>

        {reservas[selectedDate]?.length > 0 ? (
          reservas[selectedDate].map(r => (
            <div key={r.id} className="reserva-item" onClick={() => openModal('edit', r)}>
              <p><strong>Mesa:</strong> {r.mesa}</p>
              <p><strong>Cliente:</strong> {r.cliente}</p>
              <p><strong>Comensales:</strong> {r.comensales}</p>
              <p><strong>Tel:</strong> {r.telefono}</p>
              <p><strong>Correo: </strong> {r.correo}</p>
              <p><strong>Hora:</strong> {r.hora}</p>
              <p><strong>Notas:</strong> {r.notas}</p>
            </div>
          ))
        ) : <p>No hay reservas.</p>}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{modalType==='create' ? 'Nueva' : 'Editar'} Reserva</h3>
            <form onSubmit={handleSubmit}>
              <input name="mesa" type="number" placeholder="Mesa" value={formData.mesa} onChange={handleInputChange} required />
              <input name="comensales" type="number" placeholder="Comensales" value={formData.comensales} onChange={handleInputChange} required />
              <input name="fecha" type="date" value={formData.fecha} onChange={handleInputChange} required />
              {/* Hora limitada de 11:00 a 22:00 */}
              <input
                name="hora"
                type="time"
                value={formData.hora}
                onChange={handleInputChange}
                required
                min="11:00"
                max="22:00"
              />
              <input name="cliente" type="text" placeholder="Cliente" value={formData.cliente} onChange={handleInputChange} required />
              <input name="telefono" type="text" placeholder="Teléfono" value={formData.telefono} onChange={handleInputChange} required />
              <input name="correo" type="email" placeholder="Correo" value={formData.correo} onChange={handleInputChange} required />
              <textarea name="notas" placeholder="Notas" value={formData.notas} onChange={handleInputChange} />
              <div className="form-buttons">
                <button type="button" onClick={() => setShowModal(false)}>Cerrar</button>
                {modalType==='edit' && <button type="button" onClick={handleDelete}>Eliminar</button>}
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AdminPage.css';
import Navbar from '../../components/JSX/Navbar_Admin';
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

  const [horasDisponibles, setHorasDisponibles] = useState([]);

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
    setFormData(prev => ({ ...prev, fecha: formattedDate }));
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

  // Generar horas dinámicas
  const generarHorasDisponibles = () => {
    const horas = [];
    for (let h = 11; h <= 22; h++) {
      for (let m of [0, 30]) {
        const horaStr = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
        horas.push(horaStr);
      }
    }
    const ahora = new Date();
    return horas.filter(horaStr => {
      if (formData.fecha === ahora.toISOString().split('T')[0]) {
        const horaReserva = new Date(`${formData.fecha}T${horaStr}`);
        return horaReserva > ahora;
      }
      return true;
    });
  };

  useEffect(() => {
    setHorasDisponibles(generarHorasDisponibles());
    const timer = setInterval(() => {
      setHorasDisponibles(generarHorasDisponibles());
    }, 60000);
    return () => clearInterval(timer);
  }, [formData.fecha]);

  const validarFormulario = () => {
    const now = new Date();
    const fechaHoraReserva = new Date(`${formData.fecha}T${formData.hora}`);

    if (fechaHoraReserva < now) {
      alert("No puedes registrar reservas en fechas y horas pasadas.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      alert("El correo electrónico no es válido.");
      return false;
    }

    const existeReserva = todasLasReservas.some(
      r => r.mesa === Number(formData.mesa) && r.fecha === formData.fecha && r.hora === formData.hora && r.id !== (currentReserva?.id || null)
    );
    if (existeReserva) {
      alert(`La mesa ${formData.mesa} ya está reservada en esa fecha y hora.`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

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
              <select name="mesa" value={formData.mesa} onChange={handleInputChange} required>
                <option value="">Selecciona mesa</option>
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>Mesa {num}</option>
                ))}
              </select>

              <select name="comensales" value={formData.comensales} onChange={handleInputChange} required>
                <option value="">Comensales</option>
                {Array.from({ length: 11 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>

              <input name="fecha" type="date" value={formData.fecha} onChange={handleInputChange} required />

              <select name="hora" value={formData.hora} onChange={handleInputChange} required>
                <option value="">Selecciona hora</option>
                {horasDisponibles.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>

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

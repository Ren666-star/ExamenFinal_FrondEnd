import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DailyMenu from './pages/JSX/DailyMenu';
import Reservation from './pages/JSX/Reservation';
import './App.css';
import Login from './pages/JSX/Login';
import Registro from './pages/JSX/Registro';
import ResetearContraseña from './pages/JSX/ResetearContraseña';
import Confirmacion from './pages/JSX/Confirmacion';
import GraciasReserva from './pages/JSX/GraciasReserva';
import AdminPage from './pages/JSX/AdminPage';

function App() {
  return (
    <Router>
      <Routes><Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/resetear" element={<ResetearContraseña />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/menu" element={<DailyMenu />} />
        <Route path="/reservas" element={<Reservation />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/gracias" element={<GraciasReserva />} />
      </Routes>
    </Router>
  );
}

export default App;
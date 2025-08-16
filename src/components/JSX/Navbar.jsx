import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';
import logo from '../../Imagenes/Logo.jpeg';

// Componente funcional Navbar
const Navbar = () => {
  return (
    // Elemento <nav> semántico para indicar que este bloque es de navegación
    <nav className="navbar">
      
      {/* Contenedor del logo */}
      <div className="logo">
        <img 
          src={logo}                  // Logo del restaurante cargado desde el import
          alt="Logo del restaurante"  // Texto alternativo para accesibilidad
          className="logo-img"        // Clase para aplicar los estilos desde el CSS
        />
      </div>

      {/* Contenedor de los enlaces de navegación */}
      <div className="nav-links">
        {/* Cada Link funciona como un <a href=""> pero sin recargar la página */}
        <Link to="/menu" className="nav-link">Platos del Día</Link>
        <Link to="/reservas" className="nav-link">Reservas</Link>
        <Link to= "/" className="nav-link">Cerrar Sesión</Link>
      </div>
    </nav>
  );
};

export default Navbar; 
// Exporta el componente Navbar para que puedas usarlo en otras páginas como <Navbar />

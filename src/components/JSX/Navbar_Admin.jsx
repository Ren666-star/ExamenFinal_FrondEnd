import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';
import logo from '../../Imagenes/Logo.jpeg';

// Usamos variable de entorno para la URL base
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

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
        <button to= "/" className="logout-btn">Cerrar Sesión</button>
        
      </div>
    </nav>
  );
};

export default Navbar; 
// Exporta el componente Navbar para que puedas usarlo en otras páginas como <Navbar />

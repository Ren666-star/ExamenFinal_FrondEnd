import React from 'react'; 
// Importa React para poder usar JSX (sintaxis parecida a HTML dentro de JavaScript)

import { Link } from 'react-router-dom'; 
// Importa Link desde react-router-dom, para navegar entre páginas sin recargar el sitio (Single Page Application)

import '../CSS/Navbar.css'; 
// Importa el archivo CSS que contiene los estilos específicos del navbar

import logo from '../../Imagenes/Logo.png'; 
// Importa el logo desde la carpeta de imágenes, para poder usarlo como src en el <img>

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
        <Link to="/" className="nav-link">Salir</Link>
      </div>
    </nav>
  );
};

export default Navbar; 
// Exporta el componente Navbar para que puedas usarlo en otras páginas como <Navbar />

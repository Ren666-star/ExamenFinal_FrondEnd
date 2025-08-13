import React from 'react'; // Importa React para poder usar JSX
import { Link } from 'react-router-dom'; // Importa Link para hacer navegación sin recargar la página
import '../CSS/Navbar_Confirmacion.css'; // Importa el CSS específico para este Navbar
import logo from '../../Imagenes/Logo.png'; // Importa el logo desde tus imágenes locales

// Componente funcional llamado Navbar
const Navbar = () => {
  return (
    // Elemento <nav> es semántico para una barra de navegación
    <nav className="navbar">
      {/* 
        Logo del restaurante. 
        Usamos Link para que al hacer click en el logo te lleve a la página principal sin recargar.
      */}
      <div className="logo">
        <Link to="/">
          <img 
            src={logo}                 // Imagen del logo importada arriba
            alt="Logo del restaurante" // Texto alternativo para accesibilidad
            className="logo-img"       // Clase para estilos CSS
          />
        </Link>
      </div>

      {/* 
        Título centrado. 
        En el CSS se usa position: absolute + left:50% + transform: translateX(-50%)
        para que quede siempre centrado en el navbar.
      */}
      <div className="titulo-navbar">
        <h1>Confirmación</h1>
      </div>
    </nav>
  );
};

export default Navbar; // Exporta el componente para poder usarlo en otras páginas

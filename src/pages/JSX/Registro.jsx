import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/estilo.css';

// URL desde variable de entorno
const API_URL = `${process.env.REACT_APP_API_URL}/usuarios`;

export default function Registro() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegistro = async () => {
    setError('');

    if (!correo || !clave) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!validarEmail(correo)) {
      setError('Correo inválido');
      return;
    }

    if (clave.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      // Verificar si ya existe el correo
      const existe = await fetch(`${API_URL}?correo=${correo}`);
      const usuarios = await existe.json();

      if (usuarios.length > 0) {
        setError('El correo ya está registrado');
        return;
      }

      // Crear nuevo usuario
      const nuevoUsuario = {
        correo,
        clave,
        rol: 'usuario'
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      });

      if (!res.ok) throw new Error('Error al registrar usuario');

      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/');
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Error en el servidor. Intenta más tarde.');
    }
  };

  return (
    <div className="contenedor">
      <div className="formulario">
        <h1>Registro</h1>

        <label>Correo</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button className="boton-principal" onClick={handleRegistro}>
          Registrarse
        </button>

        <button className="boton-principal" onClick={() => navigate('/')}>
          Regresar
        </button>
      </div>
    </div>
  );
}

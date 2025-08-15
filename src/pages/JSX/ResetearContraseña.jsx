import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/estilo.css';

export default function ResetearContraseña() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'error' o 'exito'
  const [loading, setLoading] = useState(false);

  const validarCorreo = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleReset = () => {
    if (!correo) {
      setMensaje('Por favor ingresa tu correo electrónico');
      setTipoMensaje('error');
      return;
    }

    if (!validarCorreo(correo)) {
      setMensaje('Correo inválido');
      setTipoMensaje('error');
      return;
    }

    setLoading(true);

    // Simulación de envío de correo
    setTimeout(() => {
      setMensaje(`Se ha enviado un correo de recuperación a ${correo}`);
      setTipoMensaje('exito');
      setLoading(false);
    }, 1500); // simula un pequeño delay de envío
  };

  return (
    <div className="contenedor">
      <div className="formulario">
        <h1>Recuperar Contraseña</h1>

        <label>Correo electrónico</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          disabled={loading}
        />

        {mensaje && (
          <p className={tipoMensaje === 'error' ? 'mensaje-rojo' : 'mensaje-verde'}>
            {mensaje}
          </p>
        )}

        <div className="fila-botones">
          <button className="boton-principal" onClick={() => navigate('/')} disabled={loading}>
            Regresar
          </button>
          <button className="boton-principal" onClick={handleReset} disabled={loading}>
            {loading ? 'Procesando...' : 'Enviar enlace'}
          </button>
        </div>
      </div>
    </div>
  );
}

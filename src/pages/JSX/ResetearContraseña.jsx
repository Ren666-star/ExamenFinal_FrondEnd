import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/estilo.css';
import { cambiarContraseña } from '../../utils/localAuth';

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
    const resultado = cambiarContraseña(correo, '123456');
    if (resultado.success) {
      setMensaje('Contraseña restablecida a "123456". Serás redirigido al login...');
      setTipoMensaje('exito');
      setTimeout(() => navigate('/'), 3000);
    } else {
      setMensaje(resultado.message);
      setTipoMensaje('error');
    }
    setLoading(false);
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

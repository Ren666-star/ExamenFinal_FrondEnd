// URL de la API desde variables de entorno
const API_URL = process.env.REACT_APP_API_URL;


// Leer usuarios desde backend
export async function getUsuarios() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return await res.json();
}

// Registrar usuario
export async function registrarUsuario(correo, clave) {
  const usuarios = await getUsuarios();

  if (usuarios.some(u => u.correo === correo)) {
    return { success: false, message: "El correo ya está registrado" };
  }

  const nuevoUsuario = { correo, clave };
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoUsuario),
  });

  return res.ok
    ? { success: true, message: "Registro exitoso" }
    : { success: false, message: "Error al registrar usuario" };
}

// Validar login
export async function loginUsuario(correo, clave) {
  if (correo === import.meta.env.VITE_ADMIN_EMAIL && clave === import.meta.env.VITE_ADMIN_PASSWORD) {
    return { success: true, message: "Inicio de sesión exitoso (Admin)" };
  }

  const usuarios = await getUsuarios();
  const usuario = usuarios.find(u => u.correo === correo && u.clave === clave);
  return usuario
    ? { success: true, message: "Inicio de sesión exitoso" }
    : { success: false, message: "Correo o contraseña incorrectos" };
}

// Cambiar contraseña
export async function cambiarContraseña(correo, nuevaClave) {
  const usuarios = await getUsuarios();
  const usuario = usuarios.find(u => u.correo === correo);

  if (!usuario) {
    return { success: false, message: "El correo no está registrado" };
  }

  const res = await fetch(`${API_URL}/${usuario.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...usuario, clave: nuevaClave }),
  });

  return res.ok
    ? { success: true, message: "Contraseña actualizada" }
    : { success: false, message: "Error al actualizar contraseña" };
}

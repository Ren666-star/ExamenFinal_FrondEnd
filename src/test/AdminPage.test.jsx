// src/test/admin.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminPage from '../pages/JSX/AdminPage';

// Mock de react-router-dom para Jest
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}));

test('AdminPage se renderiza con elementos básicos', () => {
  render(<AdminPage />);

  // Verificar título principal
  expect(screen.getByText(/Panel de Administración/i)).toBeInTheDocument();

  // Verificar sección de reservas
  expect(screen.getByText(/Reservas para/i)).toBeInTheDocument();

  // Verificar botón de nueva reserva
  expect(screen.getByText(/Nueva Reserva/i)).toBeInTheDocument();
});

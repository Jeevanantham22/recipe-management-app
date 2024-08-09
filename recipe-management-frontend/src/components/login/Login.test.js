// src/components/login/Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLogin } from '../../services/login/login';
import Login from './Login';

// Mock the useLogin hook
jest.mock('../../services/login/login', () => ({
  useLogin: () => ({
    submitLogin: jest.fn(),
  }),
}));

describe('Login Component', () => {
  it('renders the login form', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // Check if the form fields and button are present
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Login');
  });

//   it('submits the form', async () => {
//     const mockSubmitLogin = jest.fn();
//     useLogin.mockReturnValue({ submitLogin: mockSubmitLogin });

//     render(
//       <Router>
//         <Login />
//       </Router>
//     );

//     fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'ind-jeeva' } });
//     fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password@123' } });
//     fireEvent.click(screen.getByRole('button', { name: /login/i }));

//     await waitFor(() => {
//       expect(mockSubmitLogin).toHaveBeenCalledWith({
//         userName: 'ind-jeeva',
//         password: 'Password@123',
//       });
//     });
//   });

  it('shows validation errors', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check if validation errors are displayed
    expect(await screen.findByText('Username is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  // Add more tests as needed, such as checking error messages for specific validation rules
});

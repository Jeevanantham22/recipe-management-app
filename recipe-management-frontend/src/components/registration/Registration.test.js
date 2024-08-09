import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Registration from './Registration';
import { useRegister } from '../../services/login/register';
import { SnackbarProvider } from '../../services/context/snackbarContext';

// Mock the useRegister hook
jest.mock('../../services/login/register', () => ({
    useRegister: jest.fn(),
}));

// Mock SnackbarContext
jest.mock('../../services/context/snackbarContext', () => ({
    useSnackbarContext: () => ({
        showSuccessSnackbar: jest.fn(),
        showErrorSnackbar: jest.fn(),
        showWarningSnackbar: jest.fn(),
        showInfoSnackbar: jest.fn(),
    }),
}));

describe('Registration Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the registration form', () => {
        render(
            <Router>
                {/* <SnackbarProvider> */}
                <Registration />
                {/* </SnackbarProvider> */}
            </Router>
        );

        expect(screen.getByPlaceholderText('Firstname')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Lastname')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Register');
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

      it('submits the form with valid data', async () => {
        const mockSubmitRegister = jest.fn();
        useRegister.mockReturnValue({ submitRegister: mockSubmitRegister });

        render(
          <Router>
            <SnackbarProvider>
              <Registration />
            </SnackbarProvider>
          </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Firstname'), { target: { value: 'Jeevanantham' } });
        fireEvent.change(screen.getByPlaceholderText('Lastname'), { target: { value: 'P' } });
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'ind-jeeva' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'jeeva@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Passsword@123' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => {
          expect(mockSubmitRegister).toHaveBeenCalledWith({
            firstname: 'Jeevanantham',
            lastname: 'P',
            userName: 'ind-jeeva',
            email: 'jeeva@example.com',
            password: 'Passsword@123',
          });
        });
      });

      it('shows validation errors when the form is submitted with invalid data', async () => {
        render(
          <Router>
            <SnackbarProvider>
              <Registration />
            </SnackbarProvider>
          </Router>
        );

        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        expect(await screen.findByText('Firstname is required')).toBeInTheDocument();
        expect(await screen.findByText('Lastname is required')).toBeInTheDocument();
        expect(await screen.findByText('Username is required')).toBeInTheDocument();
        expect(await screen.findByText('Email is required')).toBeInTheDocument();
        expect(await screen.findByText('Password is required')).toBeInTheDocument();
      });
});

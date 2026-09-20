import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import Login from '../../pages/Login';
import { useAuthStore } from '../../store/useAuthStore';

describe('Login Page', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ user: null, loading: false });
  });

  it('renders login elements properly and validates 3 characters rule', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const input = screen.getByTestId('login-name-input');
    const button = screen.getByTestId('login-submit-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeDisabled();

    // Less than 3 chars
    fireEvent.change(input, { target: { value: 'Lu' } });
    expect(button).toBeDisabled();

    // 3 or more chars
    fireEvent.change(input, { target: { value: 'Ludson' } });
    expect(button).not.toBeDisabled();
  });

  it('submits user login correctly', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const input = screen.getByTestId('login-name-input');
    const button = screen.getByTestId('login-submit-button');

    fireEvent.change(input, { target: { value: 'Ludson' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(useAuthStore.getState().user?.name).toBe('Ludson');
    });
  });
});

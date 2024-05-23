import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../screens/Public/Login';
import { authContext } from '../Providers/AuthProvider';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

const mockSignIn = jest.fn();

const mockAuthContext = {
  isSignedIn: false,
  SignIn: mockSignIn,
  SignOut: jest.fn(),
};

describe('LoginScreen', () => {
  beforeEach(() => {
    render(
      <authContext.Provider value={mockAuthContext}>
        <LoginScreen />
      </authContext.Provider>
    );
  });

  it('should render login screen correctly', () => {
    expect(screen.getByPlaceholderText('CPF')).toBeTruthy();
    expect(screen.getByPlaceholderText('Senha')).toBeTruthy();
    expect(screen.getByRole('button', { name: /login/i })).toBeTruthy();
  });

  it('should handle login correctly', async () => {
    fireEvent.changeText(screen.getByPlaceholderText('CPF'), '123456789');
    fireEvent.changeText(screen.getByPlaceholderText('Senha'), 'password');
    fireEvent.press(screen.getByRole('button', { name: /login/i }));

    expect(mockSignIn).toHaveBeenCalledWith({ cpf: '123456789', senha: 'password' });
  });

  it('should toggle password visibility', () => {
    const passwordInput = screen.getByPlaceholderText('Senha');
    const toggleButton = screen.getByRole('button', { name: /mostrar senha/i });

    expect(passwordInput.props.secureTextEntry).toBe(true);

    fireEvent.press(toggleButton);
    expect(passwordInput.props.secureTextEntry).toBe(false);

    fireEvent.press(toggleButton);
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });
});

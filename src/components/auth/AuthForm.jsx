// src/components/auth/AuthForm.jsx
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom@6.22.1';
import { useAuth } from 'src/context/AuthContext.js';
import Button from 'src/components/common/Button.jsx';
import Input from 'src/components/common/Input.jsx';

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  email: string;
  username: string;
  password: string;
}

const AuthForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
      const value = e.target.value;
      switch (fieldName) {
        case 'email':
          setEmail(value);
          setEmailError(''); // Clear error on input
          break;
        case 'password':
          setPassword(value);
          setPasswordError(''); // Clear error on input
          break;
        case 'username':
          setUsername(value);
          setUsernameError(''); // Clear error on input
          break;
        default:
          break;
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Client-side validation
      let isValid = true;
      if (!email) {
        setEmailError('Email is required');
        isValid = false;
      } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
        setEmailError('Invalid email format');
        isValid = false;
      }

      if (!password) {
        setPasswordError('Password is required');
        isValid = false;
      }

      if (!isLogin && !username) {
        setUsernameError('Username is required');
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      setIsLoading(true);

      try {
        if (isLogin) {
          const loginForm: LoginForm = {
            email: email,
            password: password,
          };
          await login(loginForm);
        } else {
          const registerForm: RegisterForm = {
            email: email,
            username: username,
            password: password,
          };
          await register(registerForm);
        }
      } catch (error: any) {
        alert(error.message || 'Authentication failed');
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, username, isLogin, login, register, navigate]
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-4 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => handleInputChange(e, 'email')}
            error={emailError}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => handleInputChange(e, 'password')}
            error={passwordError}
            placeholder="Enter your password"
          />
          {!isLogin && (
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => handleInputChange(e, 'username')}
              error={usernameError}
              placeholder="Enter your username"
            />
          )}
          <div className="flex items-center justify-between">
            <Button
              label={isLogin ? 'Login' : 'Register'}
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
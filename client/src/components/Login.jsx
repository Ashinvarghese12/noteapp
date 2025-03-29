import React, { useState } from 'react';
import { API } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ setToken, setPage, setUserName }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const login = async () => {
    if (!email || !password) return toast.error('All fields are required');
    if (!validateEmail(email)) return toast.error('Enter a valid email');

    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUserName(user.name);
      toast.success('Login Successful', { delay: 2000 });
      setEmail('');
      setPassword('');
    } catch (err) {
      toast.error('Login failed. Please check your credentials.', { delay: 2000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="button"
            className="absolute top-3 right-3 text-sm text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          onClick={login}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-700"
        >
          LOGIN
        </button>
        <p className="mt-4 text-gray-600 text-center">Don't have an account?
          <button
            className="text-black ml-1 font-semibold"
            onClick={() => setPage('register')}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { API } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register({ setPage, setUserName }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // Toggle password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError(
        'Password must be at least 8 characters, include one uppercase letter, one number, and one special character'
      );
    } else {
      setPasswordError('');
    }
  };

  const signup = async () => {
    if (!name || !email || !password || !confirmPassword) return toast.error('All fields are required');
    if (!validateEmail(email)) return toast.error('Enter a valid email');
    if (!validatePassword(password)) return toast.error('Invalid password format');
    if (password !== confirmPassword) return toast.error('Passwords do not match');

    try {
      await API.post('/auth/signup', { name, email, password });
      toast.success('Registered successfully!');
      setUserName(name);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => setPage('login'), 2000);
    } catch (err) {
      toast.error('Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />

        {/* Password Input */}
        <div className="relative mb-2">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => handlePasswordChange(e.target.value)}
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

        {/* Password condition display */}
        {passwordError && (
          <p className="text-red-500 text-sm mb-2 whitespace-pre-line">{passwordError}</p>
        )}

        {/* Confirm Password */}
        <div className="relative mb-6">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="button"
            className="absolute top-3 right-3 text-sm text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          onClick={signup}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-700"
        >
          Register
        </button>

        <p className="mt-4 text-gray-600 text-center">Already have an account?
          <button
            className="text-black ml-1 font-semibold"
            onClick={() => setPage('login')}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

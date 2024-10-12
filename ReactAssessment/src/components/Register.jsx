import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  // using useState for updating 
  const [userData, setUserData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = () => {
    if (userData.username && userData.password) {
      localStorage.setItem('user', JSON.stringify(userData));
      alert('Signup successful! You can now log in.');
      navigate('/login');
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-indigo-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-lg p-10 max-w-sm w-full">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Create Account</h2>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          className="w-full px-4 py-3 mb-5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className="w-full px-4 py-3 mb-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Register;
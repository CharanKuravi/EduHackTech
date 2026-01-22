// src/modules/auth/pages/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Only importing Link, not Login!
import { useTheme } from '../../../context/ThemeContext';

const Login = () => {
  const { bgPrimary, primary } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-850">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your <span className={primary}>personalized dashboard</span>
          </p>
        </div>
        
        {/* Simple Login Form */}
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="email"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email address"
            />
            <input
              type="password"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${bgPrimary} hover:opacity-90 transition-all`}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
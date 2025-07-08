import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/login',
        formData,
        { withCredentials: true } 
      );

      if (response.data.success) {
        const role = response.data.data.user.role; 

        // Navigate to the appropriate dashboard based on the role
        if (role === 'owner') {
          navigate('/OwnerDashboard');
        } else if (role === 'tenant') {
          navigate('/TenantDashboard');
        } else {
          setError('Invalid role. Please contact support.');
        }
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
      }
  }

  return (
    
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="mt-2 text-gray-600">Please sign in to your account</p>
      </div>

      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </form>
    </div>
  )
};

export default LoginForm;
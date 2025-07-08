import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';


const OwnerSignupForm = ({ onBack, onClick }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    ownerAadhaar: '',
    ownerAddress: '',
    ownerPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle owner signup logic here

    try {
      const response = await axios.post('/api/newOwner', formData);
      if (response.status === 201) {
        console.log("Owner added sexsexfuly");
        
      }
    } catch (error) {
      console.error('Error adding owner:', error);
    }

  
    setFormData({
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      ownerAadhaar: '',
      ownerAddress: '',
      ownerPassword: ''
    });
    
    window.location.reload()
    
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 ml-2">House Owner Registration</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={formData.ownerName}
            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={formData.ownerPhone}
            onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.ownerEmail}
            onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
          <input
            type="text"
            value={formData.ownerAadhaar}
            onChange={(e) => setFormData({ ...formData, ownerAadhaar: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            value={formData.ownerAddress}
            onChange={(e) => setFormData({ ...formData, ownerAddress: e.target.value })}
            rows="2"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={formData.ownerPassword}
            onChange={(e) => setFormData({ ...formData, ownerPassword: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default OwnerSignupForm;
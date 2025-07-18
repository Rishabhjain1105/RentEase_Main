import { Home, BarChart2, Users } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderLandingPage = () => {
  const navigate = useNavigate();
  return (
    <nav className="max-w-full mx-auto px-4 py-4 flex justify-between items-center bg-white text-white">
      {/* Logo */}
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
          RE
        </div>
        <span className="text-2xl font-bold text-gray-800">RentEase</span>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium">Features</a>
        <a href="#properties" className="text-gray-600 hover:text-blue-600 font-medium">Properties</a>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => navigate('/auth')}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
      >
        Get Started
      </button>
    </nav>
  );
};

export default HeaderLandingPage;
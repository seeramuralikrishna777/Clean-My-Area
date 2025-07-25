import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { auth } from '../firebase';

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser.name || 'User');
      setRole(storedUser.role || 'Citizen');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">CivicPulse</span>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
            <Link to="/submit-case" className="text-gray-700 hover:text-blue-600 font-medium">Submit Case</Link>
            <Link to="/track" className="text-gray-700 hover:text-blue-600 font-medium">Track</Link>
            <Link to="/resolved" className="text-gray-700 hover:text-blue-600 font-medium">Resolved</Link>
            <Link to="/analytics" className="text-gray-700 hover:text-blue-600 font-medium">Analytics</Link>
          </div>

          {/* Right: Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-gray-700 focus:outline-none"
            >
              <FaUserCircle className="text-2xl" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                <div className="px-4 py-2 text-sm text-gray-800 border-b">
                  <p className="font-semibold">{userName}</p>
                  <p className="text-gray-500 capitalize">{role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;

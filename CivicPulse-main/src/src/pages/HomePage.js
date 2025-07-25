// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const HomePage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  return (
    <DashboardLayout>
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to CivicPulse</h1>
        <p className="text-lg text-gray-600 mb-6">
          A civic engagement platform where citizens report issues, NGOs act on them, and admins track progress.
        </p>

        <div className="space-x-4">
          {(role === 'Citizen' || role === 'Admin') && (
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate('/dashboard/submit-case')}
            >
              Submit New Case
            </button>
          )}
          <button
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            onClick={() => navigate('/dashboard')}
          >
            View All Cases
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-2">Track Your Case Progress</h2>
          <p className="text-gray-500">
            Stay updated with real-time status updates: <strong>Pending</strong>, <strong>In Progress</strong>, and{' '}
            <strong>Resolved</strong>.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;

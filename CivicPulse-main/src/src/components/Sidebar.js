// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-[#1e293b] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">CivicPulse</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard/submit-case" className="hover:underline">Submit Case</Link>
        <Link to="/dashboard/resolved-cases" className="hover:underline">Resolved Cases</Link>
        <Link to="/dashboard/analytics" className="hover:underline">Analytics</Link>
        <Link to="/dashboard/ngo-view" className="hover:underline">NGO View</Link>
        <Link to="/" className="hover:underline">Home</Link>
      </nav>
    </div>
  );
};

export default Sidebar;

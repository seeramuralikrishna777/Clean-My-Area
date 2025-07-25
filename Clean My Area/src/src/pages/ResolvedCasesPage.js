import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';

const ResolvedCasesPage = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchResolvedCases = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/cases/resolved', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCases(res.data);
      } catch (err) {
        console.error('Error fetching resolved cases:', err);
      }
    };

    fetchResolvedCases();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Resolved Cases</h2>
      <div className="space-y-4">
        {cases.length === 0 ? (
          <p>No resolved cases found.</p>
        ) : (
          cases.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-1">📍 {item.location}</p>
              <p className="text-gray-700">{item.description}</p>
              <p className="mt-2 text-green-600 font-bold">✅ Status: {item.status}</p>
              {item.image && (
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt="Case"
                  className="mt-3 rounded w-full max-h-60 object-cover"
                />
              )}
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default ResolvedCasesPage;

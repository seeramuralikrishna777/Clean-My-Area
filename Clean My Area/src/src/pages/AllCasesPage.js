import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AllCasesPage = () => {
  const [cases, setCases] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cases', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCases(res.data);
      } catch (err) {
        console.error('Error fetching cases:', err);
      }
    };

    fetchCases();
  }, [token]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Submitted Cases</h2>
      {cases.length === 0 ? (
        <p>No cases found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cases.map((c) => (
            <div
              key={c._id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p className="text-gray-700 mb-2">{c.description}</p>
              <p className="text-sm text-gray-500">
                Location: {c.location || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Status: <span className="font-semibold">{c.status}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Submitted At: {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCasesPage;

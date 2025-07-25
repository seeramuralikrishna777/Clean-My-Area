import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';

const NGOViewPage = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchAssignedCases = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/cases', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userId = JSON.parse(localStorage.getItem('user'))?._id;
        const assignedCases = res.data.filter((c) => c.assignedTo === userId);
        setCases(assignedCases);
      } catch (err) {
        console.error('Error fetching NGO cases:', err);
      }
    };

    fetchAssignedCases();
  }, []);

  const handleStatusChange = async (caseId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/cases/${caseId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCases((prev) =>
        prev.map((item) => (item._id === caseId ? res.data : item))
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Cases Assigned to You</h2>
      <div className="space-y-4">
        {cases.length === 0 ? (
          <p>No cases assigned yet.</p>
        ) : (
          cases.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{item.location}</p>
              <p className="text-gray-700">{item.description}</p>
              <div className="mt-2">
                <span className="font-semibold mr-2">Status:</span>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default NGOViewPage;

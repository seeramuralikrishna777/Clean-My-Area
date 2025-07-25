// src/pages/ProgressPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function ProgressPage() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/cases/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCases(res.data);
      } catch (err) {
        console.error("Failed to load cases", err);
      }
    };
    fetchCases();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📊 Case Progress</h2>
      {cases.length === 0 ? (
        <p>No cases found.</p>
      ) : (
        <ul className="space-y-4">
          {cases.map((c) => (
            <li key={c._id} className="border p-4 rounded shadow">
              <p><strong>Subject:</strong> {c.subject}</p>
              <p><strong>Status:</strong> {c.status}</p>
              <p><strong>Progress:</strong> {c.progress}%</p>
              {c.imageUrl && <img src={c.imageUrl} alt="Uploaded" className="w-48 mt-2" />}
              <p><strong>Submitted:</strong> {new Date(c.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProgressPage;

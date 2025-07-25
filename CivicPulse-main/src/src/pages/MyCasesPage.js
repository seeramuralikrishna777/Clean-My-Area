// src/pages/MyCasesPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CaseCard from '../components/CaseCard';
import FilterControls from '../components/FilterControls';

const MyCasesPage = () => {
  const [cases, setCases] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchCases = async () => {
      const res = await axios.get('/api/cases', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
      const myCases = res.data.filter((c) => c.createdBy === userId);
      setCases(myCases);
    };
    fetchCases();
  }, []);

  const filteredCases = statusFilter
    ? cases.filter((c) => c.status === statusFilter)
    : cases;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📋 My Submitted Cases</h1>
      <FilterControls statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCases.map((caseItem) => (
          <CaseCard key={caseItem._id} caseData={caseItem} />
        ))}
      </div>
    </div>
  );
};

export default MyCasesPage;

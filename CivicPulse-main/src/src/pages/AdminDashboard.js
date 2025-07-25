import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortNewest, setSortNewest] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback");
      const data = res.data.reverse(); // newest first by default
      setFeedbacks(data);
      setFiltered(data);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    setFiltered(
      feedbacks.filter(
        (f) =>
          f.name.toLowerCase().includes(keyword) ||
          f.email.toLowerCase().includes(keyword) ||
          f.subject.toLowerCase().includes(keyword)
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      fetchFeedbacks();
    } catch (error) {
      alert("❌ Failed to delete feedback");
    }
  };

  const toggleSort = () => {
    const sorted = [...filtered].reverse();
    setFiltered(sorted);
    setSortNewest(!sortNewest);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">🛠️ Admin Dashboard</h1>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="🔍 Search feedback..."
          className="w-full md:w-1/2 p-2 border rounded"
        />
        <button
          onClick={toggleSort}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sort: {sortNewest ? "Newest" : "Oldest"}
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No feedback available.</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((fb) => (
            <div key={fb._id} className="border rounded p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{fb.subject}</h2>
                <button
                  onClick={() => handleDelete(fb._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-1">From: {fb.name} ({fb.email})</p>
              <p className="text-gray-800">{fb.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

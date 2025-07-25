import axios from "axios";
import React, { useState } from "react";

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", formData);
      alert("✅ Feedback submitted successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Submission error:", err);
      alert("❌ Failed to submit feedback.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto border rounded">
      <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>

      <input type="text" name="name" placeholder="Name" value={formData.name}
        onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />

      <input type="email" name="email" placeholder="Email" value={formData.email}
        onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />

      <input type="text" name="subject" placeholder="Subject" value={formData.subject}
        onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />

      <textarea name="message" placeholder="Message" value={formData.message}
        onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}

export default FeedbackForm;

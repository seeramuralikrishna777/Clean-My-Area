import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Welcome to CivicPulse</h1>
      <Link to="/submit" className="text-blue-500 underline mr-4">Give Feedback</Link>
      <Link to="/admin" className="text-blue-500 underline">Admin Dashboard</Link>
    </div>
  );
}

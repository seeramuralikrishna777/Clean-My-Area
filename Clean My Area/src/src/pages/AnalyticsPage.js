import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const AnalyticsPage = () => {
  const [caseData, setCaseData] = useState([]);
  const [filteredRole, setFilteredRole] = useState("All");

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/cases", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCaseData(response.data);
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };

    fetchCaseData();
  }, []);

  const getMonthlyData = () => {
    const monthlyStats = {};

    caseData.forEach((c) => {
      if (filteredRole !== "All" && c.userRole !== filteredRole) return;

      const date = new Date(c.createdAt);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!monthlyStats[month]) {
        monthlyStats[month] = { month, submitted: 0, resolved: 0 };
      }

      monthlyStats[month].submitted += 1;
      if (c.status === "Resolved") {
        monthlyStats[month].resolved += 1;
      }
    });

    return Object.values(monthlyStats).sort((a, b) => new Date(a.month) - new Date(b.month));
  };

  const exportChartAsImage = () => {
    const svg = document.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = "#ffffff"; // ensure white background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const png = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "chart.png";
      link.href = png;
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const chartData = getMonthlyData();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Case Analytics</h2>

      <div className="mb-4 flex gap-4 items-center">
        <label htmlFor="role" className="font-medium">
          Filter by Role:
        </label>
        <select
          id="role"
          value={filteredRole}
          onChange={(e) => setFilteredRole(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="All">All</option>
          <option value="Admin">Admin</option>
          <option value="NGO">NGO</option>
          <option value="Citizen">Citizen</option>
        </select>
        <Button onClick={exportChartAsImage}>Export as PNG</Button>
      </div>

      <Card className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <CardContent>
          {chartData.length === 0 ? (
            <p className="text-center text-gray-500">No case data available for selected role.</p>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="submitted" fill="#8884d8" name="Submitted Cases" />
                <Bar dataKey="resolved" fill="#82ca9d" name="Resolved Cases" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;

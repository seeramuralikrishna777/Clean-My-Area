import React from "react";

export const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow p-4 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-2 ${className}`}>{children}</div>
);

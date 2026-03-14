"use client";

import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

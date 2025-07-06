import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-900 text-white p-6 space-y-4">
        <h1 className="text-xl font-bold text-blue-400">NeuraMail 2030</h1>
        <nav className="flex flex-col space-y-2">
          <Link to="/" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/flow-builder" className="hover:text-blue-400">Flow Builder</Link>
          <Link to="/recipient-profile" className="hover:text-blue-400">Recipient Profile</Link>
          <Link to="/analytics" className="hover:text-blue-400">Analytics</Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}

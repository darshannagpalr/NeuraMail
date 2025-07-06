import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import FlowBuilder from "./components/FlowBuilder";
import RecipientProfile from "./components/RecipientProfile";
import Analytics from "./components/Analytics";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/flow-builder" element={<FlowBuilder />} />
          <Route path="/recipient-profile" element={<RecipientProfile />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

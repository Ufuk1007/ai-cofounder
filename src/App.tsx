import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { CreateAgentPage } from './pages/CreateAgentPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-agent" element={<CreateAgentPage />} />
        <Route path="/chat/:agentId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}
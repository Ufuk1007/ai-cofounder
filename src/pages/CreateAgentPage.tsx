import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PersonalityForm } from '../components/Personality/PersonalityForm';
import { useConversationStore } from '../store/conversationStore';
import type { AgentPersonality } from '../types/personality';

export const CreateAgentPage = () => {
  const navigate = useNavigate();
  const addAgent = useConversationStore(state => state.addAgent);

  const handleSubmit = (data: AgentPersonality) => {
    addAgent(data);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-4xl mx-auto p-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-bold text-white">Create New AI Co-founder</h1>
            <p className="text-gray-400 mt-2">
              Configure your AI co-founder's personality and expertise areas.
            </p>
          </div>

          <PersonalityForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
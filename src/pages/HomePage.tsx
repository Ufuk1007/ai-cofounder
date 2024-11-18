import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConversationStore } from '../store/conversationStore';
import { AgentCard } from '../components/Agents/AgentCard';

export const HomePage = () => {
  const { agents } = useConversationStore();

  return (
    <div className="min-h-screen bg-dark p-8">
      {/* Welcome Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-4">
          Welcome to AI Co-founder Platform
        </h1>
        <p className="text-gray-300 text-lg">
          Create and collaborate with AI co-founders tailored to your startup needs.
          Train them, chat with them, and let them help you build your business.
        </p>
      </div>

      {/* Create New Agent Button */}
      <div className="max-w-4xl mx-auto mb-12">
        <Link
          to="/create-agent"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          <span>Create New AI Co-founder</span>
        </Link>
      </div>

      {/* Agents Grid */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">Your AI Co-founders</h2>
        {agents.length === 0 ? (
          <div className="glass-card rounded-xl p-8 text-center">
            <p className="text-gray-400 mb-4">You haven't created any AI co-founders yet.</p>
            <p className="text-sm text-gray-500">
              Create your first AI co-founder to get started on your entrepreneurial journey.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onClick={() => {/* Navigate to agent chat */}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
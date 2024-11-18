import React from 'react';
import { Brain, MessageCircle, BookOpen, ArrowRight } from 'lucide-react';
import type { AgentPersonality } from '../../types/personality';

interface AgentCardProps {
  agent: AgentPersonality & { id: string };
  onClick: () => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick }) => {
  return (
    <div 
      className="glass-card rounded-xl p-6 cursor-pointer hover:border-accent-secondary/30 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{agent.name}</h3>
          <p className="text-sm text-gray-400">{agent.role}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <MessageCircle size={16} />
          <span>Chat available</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <BookOpen size={16} />
          <span>{agent.expertise.length} expertise areas</span>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <ArrowRight className="w-5 h-5 text-accent-secondary" />
      </div>
    </div>
  );
};
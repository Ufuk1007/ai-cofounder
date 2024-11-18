import React, { useState } from 'react';
import { Brain, Briefcase, User, Edit2, Check } from 'lucide-react';
import type { AgentPersonality } from '../../types/personality';
import { useConversationStore } from '../../store/conversationStore';

interface PersonalityCardProps {
  personality: AgentPersonality | null;
}

export const PersonalityCard: React.FC<PersonalityCardProps> = ({ personality }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(personality?.name || '');
  const updatePersonality = useConversationStore(state => state.updatePersonality);

  if (!personality) {
    return (
      <div className="glass-card rounded-xl p-6 text-center">
        <p className="text-gray-400">No AI Co-founder configured yet.</p>
        <p className="text-sm text-gray-500">Click the + button to create one.</p>
      </div>
    );
  }

  const handleNameSave = () => {
    if (editedName.trim()) {
      updatePersonality({
        ...personality,
        name: editedName.trim()
      });
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    }
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-dark-card border border-accent-secondary rounded px-2 py-1 text-xl font-bold text-white focus:outline-none"
                autoFocus
              />
              <button
                onClick={handleNameSave}
                className="p-1 hover:text-accent-secondary"
              >
                <Check size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white">{personality.name}</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <Edit2 size={14} />
              </button>
            </div>
          )}
          <p className="text-sm text-gray-400">{personality.role}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Brain className="w-4 h-4 text-accent-secondary" />
            <h3 className="font-medium text-gray-200">Personality Type</h3>
          </div>
          <div className="px-3 py-2 rounded-lg bg-dark-card text-accent-secondary border border-accent-secondary/20">
            <div className="font-medium">{personality.jungianType.type}</div>
            <div className="text-sm text-gray-400 mt-1">
              {personality.jungianType.description}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Briefcase className="w-4 h-4 text-accent-primary" />
            <h3 className="font-medium text-gray-200">Expertise</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {personality.expertise.map((exp) => (
              <span
                key={exp}
                className="px-3 py-1 rounded-full text-sm bg-dark-card text-accent-primary border border-accent-primary/20"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>

        {personality.description && (
          <div className="p-4 rounded-lg bg-dark-card/50 border border-white/5">
            <p className="text-gray-300 text-sm">{personality.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
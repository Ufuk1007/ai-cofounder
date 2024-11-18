import React from 'react';
import { X } from 'lucide-react';
import { PersonalityForm } from './PersonalityForm';
import type { AgentPersonality } from '../../types/personality';

interface NewCofounderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AgentPersonality) => void;
}

export const NewCofounderModal: React.FC<NewCofounderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark-lighter rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Create New AI Co-founder</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <PersonalityForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MessageList } from '../components/Chat/MessageList';
import { MessageInput } from '../components/Chat/MessageInput';
import { PersonalityCard } from '../components/Personality/PersonalityCard';
import { useConversationStore } from '../store/conversationStore';

export const ChatPage = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const { agents, messages, addMessage } = useConversationStore();
  const agent = agents.find(a => a.id === agentId);
  const chatMessages = messages[agentId || ''] || [];

  const handleSendMessage = (content: string) => {
    if (!agentId) return;
    
    // Add user message
    addMessage(agentId, {
      content,
      role: 'user'
    });

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      addMessage(agentId, {
        content: 'This is a simulated response. AI integration coming soon!',
        role: 'assistant'
      });
    }, 1000);
  };

  if (!agent) {
    return (
      <div className="min-h-screen bg-dark p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">AI Co-founder not found</p>
          <button
            onClick={() => navigate('/')}
            className="text-accent-primary hover:text-accent-secondary transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-white/10 p-4 bg-dark-lighter">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Messages */}
        <MessageList messages={chatMessages} />

        {/* Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>

      {/* Sidebar */}
      <div className="w-96 border-l border-white/10 bg-dark-lighter p-6 overflow-y-auto">
        <PersonalityCard personality={agent} />
      </div>
    </div>
  );
};
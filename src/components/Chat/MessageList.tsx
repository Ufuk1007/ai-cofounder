import React from 'react';
import { Message } from '../../types';
import ReactMarkdown from 'react-markdown';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-4 ${
              message.role === 'user'
                ? 'bg-accent-secondary shadow-glow'
                : 'glass-card'
            }`}
          >
            <ReactMarkdown className="prose prose-invert prose-sm">
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};
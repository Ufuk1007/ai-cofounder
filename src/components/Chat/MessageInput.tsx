import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="border-t border-white/10 p-4 bg-dark-lighter">
      <form onSubmit={handleSubmit} className="gradient-border">
        <div className="flex items-center space-x-2 p-2 bg-dark-lighter">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent p-2 focus:outline-none text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="p-2 text-accent-primary hover:text-accent-secondary transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
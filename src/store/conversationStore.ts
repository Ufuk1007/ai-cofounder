import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AgentPersonality } from '../types/personality';
import type { Message } from '../types';

interface Agent extends AgentPersonality {
  id: string;
  createdAt: Date;
}

interface ConversationState {
  agents: Agent[];
  messages: Record<string, Message[]>;
  addAgent: (personality: AgentPersonality) => void;
  updateAgent: (id: string, personality: AgentPersonality) => void;
  removeAgent: (id: string) => void;
  addMessage: (agentId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
}

export const useConversationStore = create<ConversationState>()(
  persist(
    (set) => ({
      agents: [],
      messages: {},
      addAgent: (personality) =>
        set((state) => ({
          agents: [
            ...state.agents,
            {
              ...personality,
              id: crypto.randomUUID(),
              createdAt: new Date(),
            },
          ],
        })),
      updateAgent: (id, personality) =>
        set((state) => ({
          agents: state.agents.map((agent) =>
            agent.id === id ? { ...agent, ...personality } : agent
          ),
        })),
      removeAgent: (id) =>
        set((state) => ({
          agents: state.agents.filter((agent) => agent.id !== id),
          messages: Object.fromEntries(
            Object.entries(state.messages).filter(([key]) => key !== id)
          ),
        })),
      addMessage: (agentId, message) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [agentId]: [
              ...(state.messages[agentId] || []),
              {
                ...message,
                id: crypto.randomUUID(),
                timestamp: new Date(),
              },
            ],
          },
        })),
    }),
    {
      name: 'ai-cofounder-storage',
    }
  )
);
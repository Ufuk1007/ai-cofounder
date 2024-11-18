import { create } from 'zustand';
import { AICofounder } from '../lib/ai/agent';
import { DocumentStore } from '../lib/ai/documentStore';

interface AIStore {
  agents: Record<string, AICofounder>;
  documentStores: Record<string, DocumentStore>;
  apiKey: string | null;
  setApiKey: (key: string) => void;
  initializeAgent: (agentId: string, personality: any) => void;
}

export const useAIStore = create<AIStore>((set, get) => ({
  agents: {},
  documentStores: {},
  apiKey: null,
  setApiKey: (key: string) => set({ apiKey: key }),
  initializeAgent: (agentId: string, personality: any) => {
    const { apiKey } = get();
    if (!apiKey) return;

    const agent = new AICofounder(personality, apiKey);
    const documentStore = new DocumentStore(apiKey, agentId);

    set(state => ({
      agents: { ...state.agents, [agentId]: agent },
      documentStores: { ...state.documentStores, [agentId]: documentStore }
    }));
  }
}));
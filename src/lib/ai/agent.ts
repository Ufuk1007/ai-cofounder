import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import { AgentPersonality } from '../../types/personality';

export class AICofounder {
  private model: ChatOpenAI;
  private personality: AgentPersonality;
  private basePrompt: PromptTemplate;

  constructor(personality: AgentPersonality, apiKey: string) {
    this.personality = personality;
    this.model = new ChatOpenAI({ 
      openAIApiKey: apiKey,
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.7
    });

    this.basePrompt = PromptTemplate.fromTemplate(`
      You are an AI Co-founder with the following personality:
      Name: {name}
      Role: {role}
      Personality Type: {personalityType}
      Communication Style: {communicationStyle}
      Expertise Areas: {expertise}

      Additional Context:
      {context}

      User Message: {message}

      Respond in a way that reflects your personality and expertise while providing valuable insights and guidance.
    `);
  }

  async chat(message: string, context: string = '') {
    const chain = RunnableSequence.from([
      this.basePrompt,
      this.model,
      new StringOutputParser()
    ]);

    const response = await chain.invoke({
      name: this.personality.name,
      role: this.personality.role,
      personalityType: this.personality.jungianType.type,
      communicationStyle: this.personality.communication,
      expertise: this.personality.expertise.join(', '),
      context,
      message
    });

    return response;
  }
}
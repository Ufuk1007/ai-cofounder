import { z } from 'zod';

export const JUNGIAN_TYPES = {
  ISTJ: {
    name: 'The Inspector',
    description: 'Practical and fact-minded. Values reliability and organization.'
  },
  ISFJ: {
    name: 'The Protector',
    description: 'Caring and nurturing. Focuses on supporting and protecting others.'
  },
  INFJ: {
    name: 'The Counselor',
    description: 'Insightful and creative. Driven by deep personal values.'
  },
  INTJ: {
    name: 'The Architect',
    description: 'Strategic and innovative. Focuses on systems and improvement.'
  }
} as const;

export const SOCIAL_MILIEUS = {
  business: { name: 'Business Professional', description: 'Corporate and formal' },
  academic: { name: 'Academic', description: 'Scholarly and analytical' },
  creative: { name: 'Creative', description: 'Artistic and expressive' },
  tech: { name: 'Tech-Savvy', description: 'Modern and digital-native' },
  casual: { name: 'Casual', description: 'Relaxed and approachable' }
} as const;

export const EXPERTISE_AREAS = [
  'Market Research',
  'Business Strategy',
  'Product Development',
  'Financial Planning',
  'Marketing & Sales',
  'Operations Management',
  'Technology & Innovation',
  'Customer Development',
  'Team Building',
  'Fundraising'
] as const;

export const personalitySchema = z.object({
  name: z.string().min(2),
  role: z.string(),
  jungianType: z.object({
    type: z.enum(['ISTJ', 'ISFJ', 'INFJ', 'INTJ']),
    description: z.string()
  }),
  emotion: z.object({
    primary: z.enum([
      'joy',
      'trust',
      'fear',
      'surprise',
      'sadness',
      'disgust',
      'anger',
      'anticipation'
    ]),
    intensity: z.number().min(0).max(1)
  }),
  milieu: z.object({
    type: z.enum(['business', 'academic', 'creative', 'tech', 'casual']),
    ageGroup: z.enum(['young', 'middle', 'senior'])
  }),
  expertise: z.array(z.enum(EXPERTISE_AREAS)),
  communication: z.object({
    formality: z.enum(['formal', 'informal']),
    tone: z.enum(['professional', 'neutral', 'humorous']),
    style: z.enum(['factual', 'narrative', 'consultative', 'educational'])
  }),
  description: z.string().optional(),
  avatarPrompt: z.string().optional()
});

export type AgentPersonality = z.infer<typeof personalitySchema>;
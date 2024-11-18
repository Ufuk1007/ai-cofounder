import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalitySchema, JUNGIAN_TYPES, SOCIAL_MILIEUS, EXPERTISE_AREAS } from '../../types/personality';
import type { AgentPersonality } from '../../types/personality';

interface PersonalityFormProps {
  onSubmit: (data: AgentPersonality) => void;
  initialData?: Partial<AgentPersonality>;
}

export const PersonalityForm: React.FC<PersonalityFormProps> = ({ onSubmit, initialData }) => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<AgentPersonality>({
    resolver: zodResolver(personalitySchema),
    defaultValues: {
      ...initialData,
      jungianType: {
        type: 'INTJ',
        description: JUNGIAN_TYPES.INTJ.description
      },
      emotion: {
        primary: 'trust',
        intensity: 0.8
      },
      milieu: {
        type: 'tech',
        ageGroup: 'middle'
      },
      communication: {
        formality: 'professional',
        tone: 'professional',
        style: 'consultative'
      },
      expertise: []
    }
  });

  const selectedType = watch('jungianType.type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Basic Information</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  {...field}
                  className="mt-1 block w-full rounded-md bg-dark-card border border-white/10 p-2.5 text-white"
                  placeholder="AI Co-founder Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-accent-primary">{errors.name.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-300">Role</label>
                <input
                  {...field}
                  className="mt-1 block w-full rounded-md bg-dark-card border border-white/10 p-2.5 text-white"
                  placeholder="Co-founder Role"
                />
              </div>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Personality Type</label>
          <Controller
            name="jungianType.type"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  // Update description when type changes
                  const type = e.target.value as keyof typeof JUNGIAN_TYPES;
                  control.setValue('jungianType.description', JUNGIAN_TYPES[type].description);
                }}
                className="mt-1 block w-full rounded-md bg-dark-card border border-white/10 p-2.5 text-white"
              >
                {Object.entries(JUNGIAN_TYPES).map(([type, { name }]) => (
                  <option key={type} value={type}>
                    {type} - {name}
                  </option>
                ))}
              </select>
            )}
          />
          <p className="mt-2 text-sm text-gray-400">
            {JUNGIAN_TYPES[selectedType as keyof typeof JUNGIAN_TYPES].description}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Expertise Areas</h3>
          <div className="grid grid-cols-2 gap-4">
            {EXPERTISE_AREAS.map((area) => (
              <Controller
                key={area}
                name="expertise"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={field.value?.includes(area)}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(field.value || []), area]
                          : field.value?.filter((v) => v !== area) || [];
                        field.onChange(newValue);
                      }}
                      className="rounded bg-dark-card border-white/10"
                    />
                    <span className="text-sm text-gray-300">{area}</span>
                  </label>
                )}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="mt-1 block w-full rounded-md bg-dark-card border border-white/10 p-2.5 text-white h-24"
                placeholder="Add a description for your AI Co-founder..."
              />
            )}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-md text-white font-medium hover:opacity-90 transition-opacity"
      >
        Create AI Co-founder
      </button>
    </form>
  );
};
import { RecommendedBook } from '@/app/types';

export type GenerateRecommendationsParams = {
  mood: string[];
  length: string;
  categoriesToAvoid: string[];
  userAge: string;
  readingGoal: string;
};

const generateRecommendations = async (
  params: GenerateRecommendationsParams,
): Promise<RecommendedBook[]> => {
  const response = await fetch(
    'https://my-next-book-api.onrender.com/recommendations',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  return response.json();
};

export default generateRecommendations;

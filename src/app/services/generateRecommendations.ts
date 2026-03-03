export type GenerateRecommendationsParams = {
  mood: string[];
  length: string;
  categoriesToAvoid: string[];
  userAge: string;
  readingGoal: string;
};

const generateRecommendations = async (
  params: GenerateRecommendationsParams,
) => {
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

  if (response.ok) {
    return response.json();
  }
};

export default generateRecommendations;

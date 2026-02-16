const generateRecommendations = async ({}) => {
  const response = await fetch('http://localhost:3333/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mood: 'happy',
      length: 'short',
      categoriesToAvoid: ['horror', 'romance'],
      userAge: 25,
      readingGoal: 'improve vocabulary',
    }),
  });
  if (response.ok) {
    return response.json();
  }
};

export default generateRecommendations;

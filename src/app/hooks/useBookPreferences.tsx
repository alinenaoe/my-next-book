import { useState } from 'react';
import { bookMoodOptions, categoriesToAvoid } from '@/app/constants';
import { useQueryClient } from '@tanstack/react-query';
import { Mood, Category } from '@/app/types';

const useBookPreferences = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookMood, setBookMood] = useState<Mood[]>(bookMoodOptions);
  const [bookLength, setBookLength] = useState<string>('');
  const [bookCategoriesToAvoid, setBookCategoriesToAvoid] =
    useState<Category[]>(categoriesToAvoid);
  const [userAge, setUserAge] = useState<string>('');
  const [readingGoal, setReadingGoal] = useState<string>('');

  const queryClient = useQueryClient();

  const nextButtonDisabled =
    (currentStep === 1 &&
      bookMood.filter((mood) => mood.selected).length === 0) ||
    (currentStep === 2 && !bookLength) ||
    (currentStep === 3 &&
      bookCategoriesToAvoid.filter((category) => category.selected).length ===
        0) ||
    (currentStep === 4 && !userAge) ||
    (currentStep === 5 && !readingGoal);

  const handleSelectBookMood = (
    e: React.MouseEvent<HTMLButtonElement>,
    moodId: string,
  ): void => {
    e.preventDefault();
    setBookMood(bookMood.map((m) =>
      m.id === moodId ? { ...m, selected: !m.selected } : m,
    ));
  };

  const handleSelectBookCategoryToAvoid = (
    e: React.MouseEvent<HTMLButtonElement>,
    categoryId: string,
  ): void => {
    e.preventDefault();
    setBookCategoriesToAvoid(bookCategoriesToAvoid.map((m) =>
      m.id === categoryId ? { ...m, selected: !m.selected } : m,
    ));
  };

  const handleSelectBookLength = (value: string) => setBookLength(value);
  const handleSelectUserAge = (value: string) => setUserAge(value);
  const handleSelectReadingGoal = (value: string) => setReadingGoal(value);

  const clearSelection = () => {
    setCurrentStep(1);
    setBookMood(bookMoodOptions);
    setBookLength('');
    setBookCategoriesToAvoid(categoriesToAvoid);
    setUserAge('');
    setReadingGoal('');
    queryClient.invalidateQueries({ queryKey: ['recommendations'] });
  };

  const initFromParams = (params: {
    mood: string;
    length: string;
    avoid: string;
    age: string;
    goal: string;
  }) => {
    const moodIds = new Set(params.mood.split(',').filter(Boolean));
    setBookMood(bookMoodOptions.map((m) => ({ ...m, selected: moodIds.has(m.id) })));
    setBookLength(params.length);
    const avoidIds = new Set(params.avoid.split(',').filter(Boolean));
    setBookCategoriesToAvoid(
      categoriesToAvoid.map((c) => ({ ...c, selected: avoidIds.has(c.id) })),
    );
    setUserAge(params.age);
    setReadingGoal(params.goal);
  };

  return {
    bookMood,
    bookLength,
    currentStep,
    bookCategoriesToAvoid,
    userAge,
    readingGoal,
    setCurrentStep,
    handleSelectBookMood,
    handleSelectBookLength,
    handleSelectBookCategoryToAvoid,
    nextButtonDisabled,
    handleSelectUserAge,
    handleSelectReadingGoal,
    clearSelection,
    initFromParams,
  };
};

export default useBookPreferences;

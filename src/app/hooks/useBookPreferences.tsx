import { useState } from 'react';
import {
  bookMoodOptions,
  categoriesToAvoid,
  length as lengthOptions,
  ageOptions,
  readingGoalOptions,
  MAX_MOOD_SELECTION,
  MAX_CATEGORIES_SELECTION,
} from '@/app/constants';
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
  }): boolean => {
    const moodIds = params.mood.split(',').filter(Boolean);
    const avoidIds = params.avoid.split(',').filter(Boolean);
    const validMoodIds = new Set(bookMoodOptions.map((m) => m.id));
    const validAvoidIds = new Set(categoriesToAvoid.map((c) => c.id));

    const isValid =
      moodIds.length > 0 &&
      moodIds.length <= MAX_MOOD_SELECTION &&
      moodIds.every((id) => validMoodIds.has(id)) &&
      avoidIds.length > 0 &&
      avoidIds.length <= MAX_CATEGORIES_SELECTION &&
      avoidIds.every((id) => validAvoidIds.has(id)) &&
      lengthOptions.some((option) => option.value === params.length) &&
      ageOptions.some((option) => option.value === params.age) &&
      readingGoalOptions.some((option) => option.value === params.goal);

    if (!isValid) return false;

    const moodSet = new Set(moodIds);
    setBookMood(bookMoodOptions.map((m) => ({ ...m, selected: moodSet.has(m.id) })));
    setBookLength(params.length);
    const avoidSet = new Set(avoidIds);
    setBookCategoriesToAvoid(
      categoriesToAvoid.map((c) => ({ ...c, selected: avoidSet.has(c.id) })),
    );
    setUserAge(params.age);
    setReadingGoal(params.goal);
    return true;
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

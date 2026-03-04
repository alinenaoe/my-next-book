import { ChangeEvent, useState } from 'react';
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

    const updatedMoods = bookMood.map((m) => {
      if (m.id === moodId) {
        return { ...m, selected: !m.selected };
      }
      return m;
    });

    setBookMood(updatedMoods);
  };

  const handleSelectBookCategoryToAvoid = (
    e: React.MouseEvent<HTMLButtonElement>,
    categoryId: string,
  ): void => {
    e.preventDefault();

    const updatedCategories = bookCategoriesToAvoid.map((m) => {
      if (m.id === categoryId) {
        return { ...m, selected: !m.selected };
      }
      return m;
    });

    setBookCategoriesToAvoid(updatedCategories);
  };

  const handleSelectBookLength = (e: ChangeEvent<HTMLInputElement>) => {
    setBookLength(e.target.value);
  };

  const handleSelectUserAge = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAge(e.target.value);
  };

  const handleSelectReadingGoal = (e: ChangeEvent<HTMLInputElement>) => {
    setReadingGoal(e.target.value);
  };

  const clearSelection = () => {
    setCurrentStep(1);
    setBookMood(bookMoodOptions);
    setBookLength('');
    setBookCategoriesToAvoid(categoriesToAvoid);
    setUserAge('');
    setReadingGoal('');
    queryClient.invalidateQueries({ queryKey: ['recommendations'] });
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
  };
};

export default useBookPreferences;

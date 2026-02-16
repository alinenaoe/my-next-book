'use client';

import styles from './page.module.css';
import { Form } from 'radix-ui';
import { motion } from 'motion/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Recommendations from './components/recommendations';
import { Inter, Domine } from 'next/font/google';
import StepMood from './components/StepMood/StepMood';
import Bookmark from './components/Bookmark/Bookmark';
import StepLength from './components/StepLength/StepLength';
import useBookPreferences from './hooks/useBookPreferences';
import StepAvoid from './components/StepAvoid/StepAvoid';
import StepAge from './components/StepAge/StepAge';
import StepGoal from './components/StepGoal/StepGoal';
import { useGetRecommendations } from './hooks/useGetRecommendations';
import { useEffect, useState } from 'react';
import { Button } from '@radix-ui/themes';

const fontDomine = Domine({
  subsets: ['latin'],
});

const fontInter = Inter({
  subsets: ['latin'],
});

const MotionButton = motion.create(Button);

export default function Home() {
  const [mustGetRecommendations, setMustGetRecommendations] = useState(false);

  const {
    bookMood,
    handleSelectBookMood,
    currentStep,
    setCurrentStep,
    nextButtonDisabled,
    bookLength,
    handleSelectBookLength,
    handleSelectBookCategoryToAvoid,
    bookCategoriesToAvoid,
    handleSelectUserAge,
    userAge,
    handleSelectReadingGoal,
    readingGoal,
    clearSelection,
  } = useBookPreferences();

  const { data, isLoading } = useGetRecommendations({
    enabled: mustGetRecommendations,
  });

  useEffect(() => {
    if (data && mustGetRecommendations) {
      setCurrentStep(6);
    }
  }, [data, setCurrentStep, mustGetRecommendations]);

  return (
    <div className={styles.page}>
      <Bookmark />
      <main className={`${styles.main} ${fontInter.className}`}>
        <h1 className={fontDomine.className}>
          {currentStep < 6 ? 'What should I read next?' : 'Good reading!'}
        </h1>

        <Form.Root className={styles.form}>
          {currentStep === 1 && (
            <StepMood
              handleSelectBookMood={handleSelectBookMood}
              moodSelection={bookMood}
            />
          )}

          {currentStep === 2 && (
            <StepLength
              bookLength={bookLength}
              handleSelectBookLength={handleSelectBookLength}
            />
          )}

          {currentStep === 3 && (
            <StepAvoid
              handleSelectBookCategoryToAvoid={handleSelectBookCategoryToAvoid}
              categories={bookCategoriesToAvoid}
            />
          )}
          {currentStep === 4 && (
            <StepAge handleSelectAge={handleSelectUserAge} userAge={userAge} />
          )}
          {currentStep === 5 && (
            <StepGoal
              handleSelectGoal={handleSelectReadingGoal}
              readingGoal={readingGoal}
            />
          )}

          <div className={styles.buttons}>
            {currentStep < 5 && (
              <>
                <MotionButton
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep((value) => value - 1);
                  }}
                  style={{
                    borderColor: currentStep === 1 ? '#E0E0E0' : 'unset',
                  }}
                  disabled={currentStep === 1}
                >
                  <ArrowLeftIcon />
                  Previous
                </MotionButton>
                <MotionButton
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep((value) => value + 1);
                  }}
                  disabled={nextButtonDisabled}
                >
                  Next
                  <ArrowRightIcon />
                </MotionButton>
              </>
            )}

            {currentStep === 5 && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  // setCurrentStep(6);
                  // call API
                  setMustGetRecommendations(true);
                }}
                disabled={nextButtonDisabled || isLoading}
                loading={isLoading}
              >
                Get my recommendations
              </Button>
            )}
          </div>

          {currentStep === 6 && (
            <>
              <Recommendations books={data} />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  clearSelection();
                  setMustGetRecommendations(false);
                }}
              >
                Restart
              </button>
            </>
          )}
        </Form.Root>
      </main>
    </div>
  );
}

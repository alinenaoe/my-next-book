'use client';

import styles from './page.module.css';
import { Form } from 'radix-ui';
import { motion } from 'motion/react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EnvelopeClosedIcon,
  Share1Icon,
} from '@radix-ui/react-icons';
import Recommendations from './components/StepResult/StepResult';
import { Boldonse, Ysabeau_Office } from 'next/font/google';
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

const fontBoldonse = Boldonse({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
});

const fontInter = Ysabeau_Office({
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
    params: {
      categoriesToAvoid: bookCategoriesToAvoid
        .filter((category) => category.selected)
        .map((category) => category.label),
      length: bookLength,
      mood: bookMood.filter((item) => item.selected).map((item) => item.label),
      readingGoal,
      userAge,
    },
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
        <h1 className={fontBoldonse.className}>
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

          {currentStep === 6 && <Recommendations books={data} />}

          <div className={styles.buttons}>
            {currentStep < 5 && (
              <>
                <MotionButton
                  color="indigo"
                  size="3"
                  variant="solid"
                  highContrast
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
                  color="indigo"
                  size="3"
                  variant="solid"
                  highContrast
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
              <>
                <MotionButton
                  color="indigo"
                  size="3"
                  variant="solid"
                  highContrast
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep((value) => value - 1);
                  }}
                >
                  <ArrowLeftIcon />
                  Previous
                </MotionButton>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setMustGetRecommendations(true);
                  }}
                  disabled={nextButtonDisabled || isLoading}
                  loading={isLoading}
                  color="green"
                  size="3"
                >
                  Get my recommendations
                </Button>
              </>
            )}

            {currentStep === 6 && (
              <>
                <Button color="green" size="3" variant="solid">
                  <Share1Icon />
                  Share
                </Button>
                <Button color="green" size="3" variant="solid">
                  <EnvelopeClosedIcon />
                  Send by email
                </Button>
                <Button
                  color="indigo"
                  size="3"
                  variant="solid"
                  highContrast
                  onClick={(e) => {
                    e.preventDefault();
                    clearSelection();
                    setMustGetRecommendations(false);
                  }}
                >
                  Restart
                </Button>
              </>
            )}
          </div>
        </Form.Root>
      </main>
    </div>
  );
}

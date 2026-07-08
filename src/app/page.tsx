'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Form } from 'radix-ui';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EnvelopeClosedIcon,
  Share1Icon,
  BookmarkIcon,
  CheckIcon,
} from '@radix-ui/react-icons';
import Recommendations from './components/StepResult/StepResult';
import StepMood from './components/StepMood/StepMood';
import Bookmark from './components/Bookmark/Bookmark';
import StepLength from './components/StepLength/StepLength';
import useBookPreferences from './hooks/useBookPreferences';
import StepAvoid from './components/StepAvoid/StepAvoid';
import StepAge from './components/StepAge/StepAge';
import StepGoal from './components/StepGoal/StepGoal';
import StepLoading from './components/StepLoading/StepLoading';
import { Shelf, ShelfButton } from './components/Shelf/Shelf';
import { useGetRecommendations } from './hooks/useGetRecommendations';
import { useBookshelf } from './hooks/useBookshelf';
import { Button, Spinner } from '@radix-ui/themes';
import StepProgress from './components/StepProgress/StepProgress';

const MotionButton = motion.create(Button);

export default function Home() {
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
    initFromParams,
  } = useBookPreferences();

  const { data, isFetching, isError, refetch } = useGetRecommendations({
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

  const { savedBooks, toggleBook, isSaved } = useBookshelf();
  const [isShelfOpen, setIsShelfOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Trigger fetch after state has been updated (used by surprise + URL params)
  const [shouldFetch, setShouldFetch] = useState(false);
  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false);
      refetch();
    }
  }, [shouldFetch, refetch]);

  // Auto-load from shareable URL params on first render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mood = params.get('mood');
    const length = params.get('length');
    const avoid = params.get('avoid');
    const age = params.get('age');
    const goal = params.get('goal');

    if (mood && length && avoid && age && goal) {
      const isValid = initFromParams({ mood, length, avoid, age, goal });
      if (isValid) {
        setCurrentStep(5);
        setShouldFetch(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && !isFetching) {
      setCurrentStep(6);
    }
  }, [data, setCurrentStep, isFetching]);

  const buildShareURL = () => {
    const params = new URLSearchParams({
      mood: bookMood.filter((m) => m.selected).map((m) => m.id).join(','),
      length: bookLength,
      avoid: bookCategoriesToAvoid.filter((c) => c.selected).map((c) => c.id).join(','),
      age: userAge,
      goal: readingGoal,
    });
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };

  const handleShare = async () => {
    const url = buildShareURL();
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: 'My next book recommendations', url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEmail = () => {
    if (!data) return;
    const subject = 'My next book recommendations';
    const body = [
      'Here are some book recommendations just for me:',
      '',
      ...data.map((b, i) =>
        `${i + 1}. ${b.title} by ${b.author}\n   ${b.abstract}`,
      ),
      '',
      'Get your own recommendations at: ' + buildShareURL(),
    ].join('\n');
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  };

  return (
    <div className={styles.page}>
      <Bookmark />
      <ShelfButton count={savedBooks.length} onClick={() => setIsShelfOpen(true)} />
      <Shelf
        isOpen={isShelfOpen}
        onClose={() => setIsShelfOpen(false)}
        books={savedBooks}
        onRemove={toggleBook}
      />

      <main className={styles.main}>
        <h1>{currentStep < 6 ? 'What should I read next?' : 'Good reading!'}</h1>

        {currentStep < 6 && !isFetching && (
          <StepProgress currentStep={currentStep} totalSteps={5} />
        )}

        <Form.Root className={styles.form}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && !isFetching && (
              <StepMood
                key="mood"
                handleSelectBookMood={handleSelectBookMood}
                moodSelection={bookMood}
              />
            )}

            {currentStep === 2 && !isFetching && (
              <StepLength
                key="length"
                bookLength={bookLength}
                handleSelectBookLength={handleSelectBookLength}
              />
            )}

            {currentStep === 3 && !isFetching && (
              <StepAvoid
                key="avoid"
                handleSelectBookCategoryToAvoid={handleSelectBookCategoryToAvoid}
                categories={bookCategoriesToAvoid}
              />
            )}

            {currentStep === 4 && !isFetching && (
              <StepAge
                key="age"
                handleSelectAge={handleSelectUserAge}
                userAge={userAge}
              />
            )}

            {currentStep === 5 && !isFetching && (
              <StepGoal
                key="goal"
                handleSelectGoal={handleSelectReadingGoal}
                readingGoal={readingGoal}
              />
            )}

            {isFetching && <StepLoading key="loading" />}

            {currentStep === 6 && !isFetching && (
              <Recommendations key="results" books={data ?? []} toggleBook={toggleBook} isSaved={isSaved} />
            )}
          </AnimatePresence>

          {isError && currentStep === 5 && !isFetching && (
            <p className={styles.error}>Something went wrong. Please try again.</p>
          )}

          {!isFetching && (
            <div className={styles.buttons}>
              {currentStep < 5 && (
                <>
                  <MotionButton
                    type="button"
                    color="green"
                    size="3"
                    variant="solid"
                    highContrast
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep((value) => value - 1)}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeftIcon />
                    Previous
                  </MotionButton>
                  <MotionButton
                    type="button"
                    color="green"
                    size="3"
                    variant="solid"
                    highContrast
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep((value) => value + 1)}
                    disabled={nextButtonDisabled}
                  >
                    Next
                    <ArrowRightIcon />
                  </MotionButton>
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      color="gray"
                      size="3"
                      variant="solid"
                      highContrast
                      onClick={clearSelection}
                    >
                      Start over
                    </Button>
                  )}
                </>
              )}

              {currentStep === 5 && (
                <div className={styles.result}>
                  <MotionButton
                    type="button"
                    color="green"
                    size="3"
                    variant="solid"
                    highContrast
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep((value) => value - 1)}
                  >
                    <ArrowLeftIcon />
                    Previous
                  </MotionButton>
                  <Button
                    type="button"
                    onClick={() => refetch()}
                    disabled={nextButtonDisabled}
                    color="green"
                    variant="solid"
                    highContrast
                    size="3"
                  >
                    <BookmarkIcon /> Get my recommendations
                  </Button>
                  <Button
                    type="button"
                    color="gray"
                    size="3"
                    variant="solid"
                    highContrast
                    onClick={clearSelection}
                  >
                    Start over
                  </Button>
                </div>
              )}

              {currentStep === 6 && (
                <div className={styles.result}>
                  <Button type="button" color="green" size="3" variant="soft" onClick={handleShare}>
                    {copied ? <CheckIcon /> : <Share1Icon />}
                    {copied ? 'Copied!' : 'Share'}
                  </Button>
                  <Button type="button" color="green" size="3" variant="soft" onClick={handleEmail}>
                    <EnvelopeClosedIcon />
                    Send by email
                  </Button>
                  <Button
                    type="button"
                    color="green"
                    size="3"
                    variant="solid"
                    highContrast
                    onClick={clearSelection}
                  >
                    Restart
                  </Button>
                </div>
              )}
            </div>
          )}
        </Form.Root>
      </main>
    </div>
  );
}

import styles from './StepMood.module.css';
import { motion } from 'motion/react';
import { CheckIcon } from '@radix-ui/react-icons';
import { MAX_MOOD_SELECTION } from '@/app/constants';
import { Mood } from '@/app/types';
import { fontYsabeau } from '@/app/fonts';
import { useCallback } from 'react';

type StepMoodProps = {
  moodSelection: Mood[];
  handleSelectBookMood: (
    e: React.MouseEvent<HTMLButtonElement>,
    moodId: string,
  ) => void;
};

const StepMood = ({ moodSelection, handleSelectBookMood }: StepMoodProps) => {
  const maxMoodSelected =
    moodSelection.filter((mood) => mood.selected).length === MAX_MOOD_SELECTION;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, mood: Mood) => {
      if (maxMoodSelected && !mood.selected) return;
      handleSelectBookMood(e, mood.id);
    },
    [maxMoodSelected, handleSelectBookMood],
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <p>
        What feeling do you want your next read to evoke? Pick up to{' '}
        <strong>{MAX_MOOD_SELECTION} moods</strong>
      </p>

      <div className={styles.moodButtonsContainer}>
        {moodSelection.map((mood, index) => {
          const isSelected = mood.selected;

          return (
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleClick(e, mood)}
              key={mood.id}
              className={`${
                isSelected ? styles.selectedMoodButton : styles.moodButton
              } ${fontYsabeau.className}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.01 + index * 0.08,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              style={{
                cursor:
                  maxMoodSelected && !mood.selected ? 'not-allowed' : 'pointer',
              }}
            >
              {isSelected && <CheckIcon />}
              {mood.label}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StepMood;

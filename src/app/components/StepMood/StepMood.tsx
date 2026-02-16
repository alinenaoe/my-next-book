import styles from './StepMood.module.css';
import { motion } from 'motion/react';
import { CheckIcon } from '@radix-ui/react-icons';
import { MAX_MOOD_SELECTION } from '../../constants';

type Mood = {
  id: string;
  label: string;
  selected: boolean;
};

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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <p>
        How do you want this next reading to be? Select up to{' '}
        <strong>3 options</strong>
      </p>
      <br />
      <div className={styles.moodButtonsContainer}>
        {moodSelection.map((mood, index) => {
          const isSelected = mood.selected;

          return (
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                if (maxMoodSelected && !mood.selected) return;
                handleSelectBookMood(e, mood.id);
              }}
              key={mood.id}
              className={
                isSelected ? styles.selectedMoodButton : styles.moodButton
              }
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

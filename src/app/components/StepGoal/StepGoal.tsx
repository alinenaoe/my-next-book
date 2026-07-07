import { motion } from 'motion/react';
import styles from './StepGoal.module.css';
import { readingGoalOptions } from '@/app/constants';
import { CheckIcon } from '@radix-ui/react-icons';

type StepGoalProps = {
  handleSelectGoal: (value: string) => void;
  readingGoal: string;
};

const StepGoal = ({ handleSelectGoal, readingGoal }: StepGoalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <p>Why are you picking up a book?</p>
      <div className={styles.options}>
        {readingGoalOptions.map((option, index) => {
          const isSelected = option.value === readingGoal;
          return (
            <motion.button
              type="button"
              key={option.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectGoal(option.value)}
              className={isSelected ? styles.selectedOption : styles.option}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.01 + index * 0.08,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              {isSelected && <CheckIcon />}
              {option.label}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StepGoal;

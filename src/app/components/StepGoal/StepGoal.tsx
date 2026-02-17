import { motion } from 'motion/react';
import styles from './StepGoal.module.css';

const readingGoals = [
  {
    value: 'relax',
    label: 'To relax and unwind',
  },
  {
    value: 'learn',
    label: 'To learn something new',
  },
  {
    value: 'escape',
    label: 'To escape into another world',
  },
  {
    value: 'inspire',
    label: 'To feel inspired',
  },
  {
    value: 'fun',
    label: 'Just for fun',
  },
];

type StepGoalProps = {
  handleSelectGoal: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
      <div className={styles.goal}>
        {readingGoals.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name="reading-goal"
              value={option.label}
              onChange={handleSelectGoal}
              checked={option.label === readingGoal}
            />
            {option.label}
          </label>
        ))}
      </div>
    </motion.div>
  );
};

export default StepGoal;

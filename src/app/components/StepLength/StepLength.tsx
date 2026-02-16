import { motion } from 'motion/react';
import styles from './StepLength.module.css';

const length = [
  {
    value: 'short',
    label: 'A quick read (under 250 pages)',
  },
  {
    value: 'medium',
    label: 'A few cozy reading session (250-450 pages)',
  },
  {
    value: 'long',
    label: "I'm ready for a big story (450+ pages)",
  },
  {
    value: 'any',
    label: 'No preference',
  },
];

type StepLengthProps = {
  handleSelectBookLength: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bookLength: string;
};

const StepLength = ({
  handleSelectBookLength,
  bookLength,
}: StepLengthProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <p>How long do you want your next book to be?</p>
      <div className={styles.length}>
        {length.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name="books-length"
              value={option.value}
              onChange={handleSelectBookLength}
              checked={option.value === bookLength}
            />
            {option.label}
          </label>
        ))}
      </div>
    </motion.div>
  );
};

export default StepLength;

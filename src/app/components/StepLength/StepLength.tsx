import { motion } from 'motion/react';
import styles from './StepLength.module.css';
import { length } from '@/app/constants';

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
      <p>How big a story are you up for?</p>
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

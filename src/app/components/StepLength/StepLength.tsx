import { motion } from 'motion/react';
import styles from './StepLength.module.css';
import { length } from '@/app/constants';
import { CheckIcon } from '@radix-ui/react-icons';

type StepLengthProps = {
  handleSelectBookLength: (value: string) => void;
  bookLength: string;
};

const StepLength = ({ handleSelectBookLength, bookLength }: StepLengthProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <p>How big a story are you up for?</p>
      <div className={styles.options}>
        {length.map((option, index) => {
          const isSelected = option.value === bookLength;
          return (
            <motion.button
              type="button"
              key={option.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectBookLength(option.value)}
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

export default StepLength;

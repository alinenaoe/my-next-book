import { motion } from 'motion/react';
import styles from './StepAge.module.css';
import { ageOptions } from '@/app/constants';
import { CheckIcon } from '@radix-ui/react-icons';

type StepAgeProps = {
  handleSelectAge: (value: string) => void;
  userAge: string;
};

const StepAge = ({ handleSelectAge, userAge }: StepAgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <p>
        Which <strong>age range</strong> do you fall into? This helps us avoid
        recommendations that feel too young or too mature.
      </p>
      <div className={styles.options}>
        {ageOptions.map((option, index) => {
          const isSelected = option.value === userAge;
          return (
            <motion.button
              type="button"
              key={option.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectAge(option.value)}
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

export default StepAge;

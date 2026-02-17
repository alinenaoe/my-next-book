import { motion } from 'motion/react';
import styles from './StepAge.module.css';

const age = [
  {
    value: 'under18',
    label: 'Under 18',
  },
  {
    value: '18-24',
    label: '18-24',
  },
  {
    value: '25-40',
    label: '25-40',
  },
  {
    value: '40-60',
    label: '40-60',
  },
  {
    value: '60+',
    label: '60+',
  },
  {
    value: 'preferNotToSay',
    label: 'Prefer not to say',
  },
];

type StepAgeProps = {
  handleSelectAge: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
      <div className={styles.length}>
        {age.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name="books-length"
              value={option.value}
              onChange={handleSelectAge}
              checked={option.value === userAge}
            />
            {option.label}
          </label>
        ))}
      </div>
    </motion.div>
  );
};

export default StepAge;

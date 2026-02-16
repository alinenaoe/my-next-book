import styles from './StepAvoid.module.css';
import { motion } from 'motion/react';
import { CheckIcon } from '@radix-ui/react-icons';
import { MAX_CATEGORIES_SELECTION } from '../../constants';

type Category = {
  id: string;
  label: string;
  selected: boolean;
};

type StepAvoidProps = {
  categories: Category[];
  handleSelectBookCategoryToAvoid: (
    e: React.MouseEvent<HTMLButtonElement>,
    categoryId: string,
  ) => void;
};

const StepAvoid = ({
  categories,
  handleSelectBookCategoryToAvoid,
}: StepAvoidProps) => {
  const maxCategoriesSelected =
    categories.filter((category) => category.selected).length ===
    MAX_CATEGORIES_SELECTION;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <p>
        Anything you’d rather skip? Tell us what you don’t enjoy so we can avoid
        it. Select at least one option.
      </p>
      <br />
      <div className={styles.categoryButtonsContainer}>
        {categories.map((category, index) => {
          const isSelected = category.selected;

          return (
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                if (maxCategoriesSelected && !category.selected) return;
                handleSelectBookCategoryToAvoid(e, category.id);
              }}
              key={category.id}
              className={
                isSelected
                  ? styles.selectedCategoryButton
                  : styles.categoryButton
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
                  maxCategoriesSelected && !category.selected
                    ? 'not-allowed'
                    : 'pointer',
              }}
            >
              {isSelected && <CheckIcon />}
              {category.label}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StepAvoid;

'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import styles from './StepLoading.module.css';

const quotes = [
  { text: 'A reader lives a thousand lives before he dies.', author: 'George R.R. Martin' },
  { text: 'The secret of the Great Stories is that they have no secrets.', author: 'Arundhati Roy' },
  { text: 'The problem with stereotypes is not that they are untrue, but that they are incomplete.', author: 'Chimamanda Ngozi Adichie' },
  { text: 'You are the storyteller of your own life, and you can create your own legend, or not.', author: 'Isabel Allende' },
  { text: 'I write as if to save somebody\'s life. Probably my own.', author: 'Clarice Lispector' },
  { text: 'Not all those who wander are lost.', author: 'J.R.R. Tolkien' },
];

const StepLoading = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.dots}>
        <span />
        <span />
        <span />
      </div>

      <AnimatePresence mode="wait">
        <motion.blockquote
          key={index}
          className={styles.quote}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
        >
          <p>&ldquo;{quotes[index].text}&rdquo;</p>
          <footer>— {quotes[index].author}</footer>
        </motion.blockquote>
      </AnimatePresence>

      <p className={styles.hint}>Finding your perfect reads&hellip;</p>
    </motion.div>
  );
};

export default StepLoading;

'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import Link from 'next/link';
import { BookmarkIcon } from '@radix-ui/react-icons';

import styles from './StepResult.module.css';
import { RecommendedBook } from '@/app/types';
import { useBookshelf } from '@/app/hooks/useBookshelf';

type RecommendationsProps = {
  books: RecommendedBook[];
};

const MotionBook = motion.create(Link);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const Recommendations = ({ books }: RecommendationsProps) => {
  const { isSaved, toggleBook } = useBookshelf();

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {books.map((book) => (
        <motion.div key={book.title} className={styles.book} variants={itemVariants}>
          {book.coverUrl ? (
            <MotionBook
              whileHover={{ scale: 1.02 }}
              href={book.googleBooksLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={book.coverUrl}
                width={128}
                height={198}
                alt={`Cover of ${book.title}`}
              />
            </MotionBook>
          ) : null}

          <dl className={styles.description}>
            <div>
              <dt>Title</dt>
              <dd>{book.title}</dd>
            </div>

            <div>
              <dt>Author</dt>
              <dd>{book.author}</dd>
            </div>

            <div>
              <dt>Abstract</dt>
              <dd>{book.abstract}</dd>
            </div>

            <div>
              <dt>Why you should read it</dt>
              <dd>{book.reason}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => toggleBook(book)}
            className={`${styles.bookmarkButton} ${isSaved(book.title) ? styles.bookmarkSaved : ''}`}
            aria-label={
              isSaved(book.title)
                ? `Remove ${book.title} from shelf`
                : `Save ${book.title} to shelf`
            }
          >
            <BookmarkIcon width={16} height={16} />
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Recommendations;

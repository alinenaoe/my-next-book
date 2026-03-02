import Image from 'next/image';
import { motion } from 'motion/react';
import Link from 'next/link';

import styles from './StepResult.module.css';

type RecommendedBook = {
  title: string;
  author: string;
  reason: string;
  coverUrl: string;
  abstract: string;
  googleBooksLink: string;
};

type RecommendationsProps = {
  books: RecommendedBook[];
};

const MotionBook = motion.create(Link);

const Recommendations = ({ books }: RecommendationsProps) => {
  return (
    <div className={styles.container}>
      {books.map((book) => {
        return (
          <motion.div key={book.title}>
            <div className={styles.book}>
              <MotionBook
                whileHover={{ scale: 1.02 }}
                href={book.googleBooksLink}
                target="_blank"
              >
                <Image
                  src={book.coverUrl}
                  width={128}
                  height={198}
                  alt={book.title}
                />
              </MotionBook>

              <div className={styles.description}>
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
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Recommendations;

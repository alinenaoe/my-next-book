import Image from 'next/image';
import { motion } from 'motion/react';
import { Share1Icon, EnvelopeClosedIcon } from '@radix-ui/react-icons';

import styles from './StepResult.module.css';
import { useState } from 'react';
import { Button } from '@radix-ui/themes';

type RecommendedBook = {
  isbn: string;
  name: string;
  author: string;
  reason: string;
  coverUrl: string;
  abstract: string;
};

type RecommendationsProps = {
  books: RecommendedBook[];
};

const Recommendations = ({ books }: RecommendationsProps) => {
  return (
    <div className={styles.container}>
      {books.map((book) => {
        return (
          <motion.div key={book.isbn}>
            <div className={styles.book}>
              <Image
                src={book.coverUrl}
                width={200}
                height={300}
                alt={book.name}
              />
              <div className={styles.description}>
                <div>
                  <dt>Title</dt>
                  <dd>{book.name}</dd>
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

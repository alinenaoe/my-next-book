import Image from 'next/image';
import { motion } from 'motion/react';

import books from '../books.mock';
import styles from './recommendations.module.css';
import { BookDialog } from './bookDialog';
import { useState } from 'react';

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
  const [bookModalOpen, setbookModalOpen] = useState<string | undefined>();
  //const displayedBooks = books.slice(0, 3);

  return (
    <div className={styles.container}>
      {books.map((book) => {
        return (
          <motion.div
            key={book.isbn}
            // animate={{
            //   scale: 1,
            // }}
            whileHover={{ scale: 1.1 }}
          >
            <Image
              src={book.coverUrl}
              width={200}
              height={300}
              alt={book.name}
              onClick={() => {
                setbookModalOpen(book.isbn);
              }}
            />
          </motion.div>
        );
      })}
      {/* <BookDialog open={!!bookModalOpen} /> */}
    </div>
  );
};

export default Recommendations;

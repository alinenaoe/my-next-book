'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Cross2Icon, BookmarkIcon } from '@radix-ui/react-icons';
import styles from './Shelf.module.css';
import { RecommendedBook } from '@/app/types';

type ShelfProps = {
  isOpen: boolean;
  onClose: () => void;
  books: RecommendedBook[];
  onRemove: (book: RecommendedBook) => void;
};

export const Shelf = ({ isOpen, onClose, books, onRemove }: ShelfProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            aria-label="Reading shelf"
          >
            <div className={styles.header}>
              <h2>My Shelf</h2>
              <button
                onClick={onClose}
                aria-label="Close shelf"
                className={styles.closeButton}
              >
                <Cross2Icon width={18} height={18} />
              </button>
            </div>

            {books.length === 0 ? (
              <div className={styles.empty}>
                <BookmarkIcon width={32} height={32} />
                <p>No books saved yet.</p>
                <p>Tap the bookmark on any recommendation to save it here.</p>
              </div>
            ) : (
              <ul className={styles.list}>
                {books.map((book) => (
                  <li key={book.title} className={styles.item}>
                    {book.coverUrl ? (
                      <Link
                        href={book.googleBooksLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={book.coverUrl}
                          width={52}
                          height={78}
                          alt={`Cover of ${book.title}`}
                          className={styles.cover}
                        />
                      </Link>
                    ) : null}
                    <div className={styles.info}>
                      <strong>{book.title}</strong>
                      <span>{book.author}</span>
                    </div>
                    <button
                      onClick={() => onRemove(book)}
                      aria-label={`Remove ${book.title} from shelf`}
                      className={styles.removeButton}
                    >
                      <Cross2Icon />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

type ShelfButtonProps = {
  count: number;
  onClick: () => void;
};

export const ShelfButton = ({ count, onClick }: ShelfButtonProps) => {
  return (
    <button
      className={styles.shelfButton}
      onClick={onClick}
      aria-label={`Open reading shelf${count > 0 ? ` — ${count} saved` : ''}`}
    >
      <BookmarkIcon width={18} height={18} />
      <span>Shelf</span>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            className={styles.badge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

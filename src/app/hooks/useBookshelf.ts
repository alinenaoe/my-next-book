'use client';

import { useState } from 'react';
import { RecommendedBook } from '@/app/types';
import { isRecommendedBook, sanitizeBook } from '@/app/utils/sanitizeBook';

const STORAGE_KEY = 'my-next-book-shelf';

const loadFromStorage = (): RecommendedBook[] => {
  if (typeof window === 'undefined') return [];
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isRecommendedBook).map(sanitizeBook);
  } catch {
    return [];
  }
};

export const useBookshelf = () => {
  const [savedBooks, setSavedBooks] = useState<RecommendedBook[]>(loadFromStorage);

  const toggleBook = (book: RecommendedBook) => {
    setSavedBooks((prev) => {
      const exists = prev.some((b) => b.title === book.title);
      const next = exists
        ? prev.filter((b) => b.title !== book.title)
        : [...prev, book];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isSaved = (title: string) => savedBooks.some((b) => b.title === title);

  return { savedBooks, toggleBook, isSaved };
};

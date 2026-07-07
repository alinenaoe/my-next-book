'use client';

import { useState } from 'react';
import { RecommendedBook } from '@/app/types';

const STORAGE_KEY = 'my-next-book-shelf';

const loadFromStorage = (): RecommendedBook[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
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

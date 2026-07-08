import { RecommendedBook } from '@/app/types';

const safeBooksLink = (link: string | null, title: string): string => {
  if (link) {
    try {
      const url = new URL(link);
      if (url.protocol === 'https:' || url.protocol === 'http:') {
        url.protocol = 'https:';
        return url.href;
      }
    } catch {
      // fall through
    }
  }
  return `https://books.google.com/books?q=${encodeURIComponent(title)}`;
};

const safeCoverUrl = (url: string | null): string => {
  if (!url) return '';
  return url.startsWith('http://books.google.com/')
    ? url.replace('http://', 'https://')
    : url;
};

type RawBook = {
  title: string;
  author: string;
  reason: string;
  abstract: string;
  coverUrl: string | null;
  googleBooksLink: string | null;
};

export const isRecommendedBook = (value: unknown): value is RawBook => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    ['title', 'author', 'reason', 'abstract'].every((key) => typeof v[key] === 'string') &&
    (typeof v.coverUrl === 'string' || v.coverUrl === null) &&
    (typeof v.googleBooksLink === 'string' || v.googleBooksLink === null)
  );
};

export const sanitizeBook = (book: RawBook): RecommendedBook => ({
  ...book,
  googleBooksLink: safeBooksLink(book.googleBooksLink, book.title),
  coverUrl: safeCoverUrl(book.coverUrl),
});

import { RecommendedBook } from '@/app/types';

const isGoogleBooksUrl = (url: URL): boolean =>
  (url.protocol === 'https:' || url.protocol === 'http:') &&
  (url.hostname === 'books.google.com' ||
    (url.hostname === 'www.google.com' && url.pathname.startsWith('/books')));

const safeBooksLink = (link: string, title: string): string => {
  try {
    const url = new URL(link);
    if (isGoogleBooksUrl(url)) {
      url.protocol = 'https:';
      return url.href;
    }
  } catch {
    // fall through to search fallback
  }
  return `https://books.google.com/books?q=${encodeURIComponent(title)}`;
};

const upgradeCoverUrl = (url: string): string =>
  url.startsWith('http://books.google.com/')
    ? url.replace('http://', 'https://')
    : url;

export const isRecommendedBook = (value: unknown): value is RecommendedBook =>
  typeof value === 'object' &&
  value !== null &&
  (['title', 'author', 'reason', 'coverUrl', 'abstract', 'googleBooksLink'] as const).every(
    (key) => typeof (value as Record<string, unknown>)[key] === 'string',
  );

export const sanitizeBook = (book: RecommendedBook): RecommendedBook => ({
  ...book,
  googleBooksLink: safeBooksLink(book.googleBooksLink, book.title),
  coverUrl: upgradeCoverUrl(book.coverUrl),
});

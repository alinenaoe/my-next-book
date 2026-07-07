export type Category = {
  id: string;
  label: string;
  selected: boolean;
};

export type Mood = Category;

export type RecommendedBook = {
  title: string;
  author: string;
  reason: string;
  coverUrl: string;
  abstract: string;
  googleBooksLink: string;
};

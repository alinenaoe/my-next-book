import { Mood, Category } from './types';

export const bookMoodOptions: Mood[] = [
  {
    id: 'inspiring',
    label: 'Inspiring',
    selected: false,
  },
  {
    id: 'funny',
    label: 'Funny',
    selected: false,
  },
  {
    id: 'outrageous',
    label: 'Outrageous',
    selected: false,
  },
  {
    id: 'tense',
    label: 'Tense',
    selected: false,
  },
  {
    id: 'breath-taking',
    label: 'Breath-taking	',
    selected: false,
  },
  {
    id: 'sad',
    label: 'Sad',
    selected: false,
  },
  {
    id: 'sarcastic',
    label: 'Sarcastic',
    selected: false,
  },
  {
    id: 'thought-provoking',
    label: 'Thought-provoking',
    selected: false,
  },
  {
    id: 'cathartic',
    label: 'Cathartic',
    selected: false,
  },
  {
    id: 'intriguing',
    label: 'Intriguing',
    selected: false,
  },
  {
    id: 'uplifting',
    label: 'Uplifting',
    selected: false,
  },
  {
    id: 'heartwarming',
    label: 'Heartwarming',
    selected: false,
  },
  {
    id: 'enigmatic',
    label: 'Enigmatic',
    selected: false,
  },
  {
    id: 'amusing',
    label: 'Amusing',
    selected: false,
  },
  {
    id: 'romantic',
    label: 'Romantic',
    selected: false,
  },
  {
    id: 'profound',
    label: 'Profound',
    selected: false,
  },
  {
    id: 'melancholic',
    label: 'Melancholic',
    selected: false,
  },
  {
    id: 'mysterious',
    label: 'Mysterious',
    selected: false,
  },
  {
    id: 'chaotic',
    label: 'Chaotic',
    selected: false,
  },
  {
    id: 'slow',
    label: 'Slow',
    selected: false,
  },
  {
    id: 'philosophical',
    label: 'Philosophical',
    selected: false,
  },
  {
    id: 'delightful',
    label: 'Delightful',
    selected: false,
  },
  {
    id: 'weird',
    label: 'Weird',
    selected: false,
  },
  {
    id: 'existential',
    label: 'Existential',
    selected: false,
  },
  {
    id: 'honest',
    label: 'Honest',
    selected: false,
  },
];

export const MAX_MOOD_SELECTION = 3;
export const MAX_CATEGORIES_SELECTION = 3;

export const categoriesToAvoid: Category[] = [
  {
    id: 'crime',
    label: 'Crime',
    selected: false,
  },
  {
    id: 'scifi',
    label: 'Sci-fi',
    selected: false,
  },
  {
    id: 'poetry',
    label: 'Poetry',
    selected: false,
  },
  {
    id: 'fantasy',
    label: 'Fantasy',
    selected: false,
  },
  {
    id: 'biography',
    label: 'Biography',
    selected: false,
  },
  {
    id: 'selfhelp',
    label: 'Self-help',
    selected: false,
  },
  {
    id: 'historical',
    label: 'Historical',
    selected: false,
  },
  {
    id: 'political',
    label: 'Political',
    selected: false,
  },
  {
    id: 'thriller',
    label: 'Mystery & Thriller',
    selected: false,
  },
  {
    id: 'nonfiction',
    label: 'Non-fiction',
    selected: false,
  },
  {
    id: 'horror',
    label: 'Horror',
    selected: false,
  },
  {
    id: 'classics',
    label: 'Classics',
    selected: false,
  },
];

export const length = [
  {
    value: 'short',
    label: 'A quick read (under 250 pages)',
  },
  {
    value: 'medium',
    label: 'A few cozy reading session (250-450 pages)',
  },
  {
    value: 'long',
    label: "I'm ready for a big story (450+ pages)",
  },
  {
    value: 'any',
    label: 'No preference',
  },
];

export const ageOptions = [
  { value: 'under18', label: 'Under 18' },
  { value: '18-24', label: '18-24' },
  { value: '25-40', label: '25-40' },
  { value: '40-60', label: '40-60' },
  { value: '60+', label: '60+' },
  { value: 'preferNotToSay', label: 'Prefer not to say' },
];

export const readingGoalOptions = [
  { value: 'relax', label: 'To relax and unwind' },
  { value: 'learn', label: 'To learn something new' },
  { value: 'escape', label: 'To escape into another world' },
  { value: 'inspire', label: 'To feel inspired' },
  { value: 'fun', label: 'Just for fun' },
];

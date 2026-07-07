# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

My Next Book is a Next.js web app that guides users through a 5-step preference questionnaire (mood, length, categories to avoid, age group, reading goal) and returns personalized book recommendations from a remote API. The app enforces diversity by ensuring at least one female author in every set of suggestions.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
```

There are no tests configured yet.

## Architecture

**Single-page flow** — `src/app/page.tsx` owns the entire wizard. `currentStep` (1–6) is an integer that drives which Step component renders. Step 6 is the results view.

**State management** — `useBookPreferences` (hooks/useBookPreferences.tsx) holds all preference state and step navigation in a single custom hook. All Step components are controlled: they receive their current value and a handler as props.

**Data fetching** — `useGetRecommendations` (hooks/useGetRecommendations.tsx) wraps TanStack Query with `enabled: false`, so the query only runs when `refetch()` is called explicitly (on the final "Get my recommendations" button). The query key `['recommendations']` is invalidated on `clearSelection` to allow fresh fetches on restart.

**API** — `src/app/services/generateRecommendations.ts` POSTs to `https://my-next-book-api.onrender.com/recommendations`. The backend repo is separate (Node.js/Fastify, uses an LLM + Google Books API).

**Mock data** — `src/app/books.mock.tsx` contains a static array of books used for development/testing without hitting the real API.

**Global state provider** — `src/app/providers.tsx` wraps the app in `QueryClientProvider`. The `Theme` wrapper from `@radix-ui/themes` lives in `layout.tsx`.

**Constants** — `src/app/constants.ts` defines the selectable options (moods, categories, lengths) and selection limits (`MAX_MOOD_SELECTION = 3`, `MAX_CATEGORIES_SELECTION = 3`). Add or modify options here.

**Types** — `src/app/types.ts` defines `Category` (id, label, selected) and `Mood` (alias of Category), the shared shape used across all step components.

**Styling** — CSS Modules per component + `globals.css`. Radix UI Themes provides the component library; `@radix-ui/react-icons` for icons. Motion (Framer Motion v12) is used for button tap animations.

**Fonts** — Configured in `src/app/fonts.ts` and applied via className in `page.tsx` (Boldonse for the heading, Ysabeau for body).

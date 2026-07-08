# My Next Book

<img width="1080" height="748" alt="Screenshot 2026-07-08 at 12 34 50" src="https://github.com/user-attachments/assets/5a97b358-a51c-429a-9303-7fc4538ecf8d" />

## Description

My Next Book is a web application designed to help users find their next favorite book based on their preferences. By answering a series of questions about their mood, goals, and other factors, users receive personalized book recommendations.

One of the app's unique features is its commitment to diversity. The recommendation engine ensures that at least one female author is included in the suggestions and strives to feature authors from various cultural backgrounds.

## Features

- **Interactive Steps**: Users go through multiple steps to define their preferences — mood, length, categories to avoid, age group, and reading goal.
- **Personalized Recommendations**: The app uses an AI-powered recommendation engine to suggest books that match the user's preferences.
- **Shareable URL**: Every set of recommendations generates a shareable link so results can be revisited or sent to others.
- **Reading Shelf**: Save books you're interested in to a personal shelf, persisted across sessions.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

<img width="1087" height="663" alt="Screenshot 2026-07-08 at 17 32 36" src="https://github.com/user-attachments/assets/ba7e8ae4-49e4-41ad-bc66-e0715bfe8d2f" />

## Recommendations engine

The backend, developed with Node.js and Fastify, is responsible for handling API requests, managing data, and ensuring efficient communication between the client and server. You can find the backend repository [here](https://github.com/alinenaoe/my-next-book-api).

The app leverages OpenAI to generate personalized book suggestions based on user preferences. Additionally, it integrates with the Google Books API to fetch detailed information about the recommended books.

## Technologies Used

- **Next.js**: A React-based framework for building fast and user-friendly web applications.
- **TypeScript**: Ensures type safety and better developer experience.
- **TanStack Query**: Data fetching and server state management.
- **Radix UI**: Accessible component library and design system.
- **Motion**: Animations and transitions.
- **CSS Modules**: For modular and maintainable styling.

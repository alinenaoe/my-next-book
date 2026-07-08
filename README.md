# My Next Book

<img width="600" alt="" src="https://github.com/user-attachments/assets/7c92b319-0bfc-4a09-b23e-ce6b6402719f" />

## Description

My Next Book is a web application designed to help users find their next favorite book based on their preferences. By answering a series of questions about their mood, goals, and other factors, users receive personalized book recommendations.

One of the app's unique features is its commitment to diversity. The recommendation engine ensures that at least one female author is included in the suggestions and strives to feature authors from various cultural backgrounds.

## Features

- **Interactive Steps**: Users go through multiple steps to define their preferences — mood, length, categories to avoid, age group, and reading goal.
- **Personalized Recommendations**: The app uses an AI-powered recommendation engine to suggest books that match the user's preferences.
- **Shareable URL**: Every set of recommendations generates a shareable link so results can be revisited or sent to others.
- **Reading Shelf**: Save books you're interested in to a personal shelf, persisted across sessions.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

<img width="600" alt="" src="https://github.com/user-attachments/assets/28c5a612-328f-4136-88af-f33d684aeb06" />

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

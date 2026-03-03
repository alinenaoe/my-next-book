# My Next Book

## Description

My Next Book is a web application designed to help users find their next favorite book based on their preferences. By answering a series of questions about their mood, goals, and other factors, users receive personalized book recommendations.

One of the app's unique features is its commitment to diversity. The recommendation engine ensures that at least one female author is included in the suggestions and strives to feature authors from various cultural backgrounds.

## Features

- **Interactive Steps**: Users go through multiple steps to define their preferences, such as mood, length, and goals.
- **Personalized Recommendations**: The app uses a recommendation engine to suggest books that match the user's preferences.
- **Responsive Design**: The app is designed to work seamlessly on both desktop and mobile devices.
- **Share recommendations**: [in progress].

## Recommendations engine

The backend, developed with Node.js and Fastify, is responsible for handling API requests, managing data, and ensuring efficient communication between the client and server. You can find the backend repository [here](https://github.com/alinenaoe/my-next-book-api).

The app leverages OpenAI's to generate personalized book suggestions based on user preferences. Additionally, it integrates with the Google Books API to fetch detailed information about the recommended books.

## Technologies Used

- **Next.js**: A React-based framework for building fast and user-friendly web applications.
- **TypeScript**: Ensures type safety and better developer experience.
- **CSS Modules**: For modular and maintainable styling.

# Flashcard-o-matic

This is a flashcard study web application built with **React**. The app allows users to create decks of flashcards, add cards to those decks, study the cards, and edit or delete them as needed. The goal is to help users learn by quizzing themselves using the flashcards in a deck.

## Features

- **Create Decks**: Users can create new decks of flashcards for different subjects.
- **Edit Decks**: Users can edit decks anme and description.
- **Delete Decks**: Users can delete decks.
- **Add Cards**: Each deck can have multiple cards, and users can add cards with a front and back side for studying purposes.
- **Edit and Delete Cards**: Users can edit the content of individual cards or delete cards they no longer need.
- **Study Mode**: Users can study the cards in a deck by flipping through the cards one by one and marking cards as completed.
- **Breadcrumb Navigation**: Easy navigation throughout the app with breadcrumb components on each page for better usability.

## Technologies Used

- **React**: For building the front-end components.
- **React Router**: For managing navigation and routing between different screens.
- **Bootstrap**: For responsive UI components and styling.
- **Custom Hooks**: For handling data fetching and state management across components.

## Structure

```bash
src
├── App.css
├── App.js
├── Components
│   ├── AddCard.js
│   ├── Card.js
│   ├── CreateDeck.js
│   ├── Deck.js
│   ├── EditCard.js
│   ├── EditDeck.js
│   ├── FormComponent.js
│   ├── Home.js
│   ├── NotEnoughCards.js
│   └── Study.js
├── Layout
│   ├── Header.js
│   ├── NotFound.js
│   └── index.js
├── __tests__
│   ├── App.test.js
│   └── Deck.test.js
├── data
│   └── db.json
├── index.js
└── utils
    ├── api
    │   └── index.js
    ├── class-names
    │   └── index.js
    └── globals.js
```

## How to Run the Project

1. Clone the repository:

2. Install dependencies:

3. Run the development server:

4. Open your browser and navigate to: `http://localhost:3000`

## Routes Overview

- `/` - Home page with a list of decks.
- `/decks` - Also renders the home page with a list of decks.
- `/decks/new` - Create a new deck of flashcards.
- `/decks/:deckId` - View a specific deck with its details and list of cards.
- `/decks/:deckId/edit` - Edit the details of a specific deck.
- `/decks/:deckId/study` - Study the cards in a specific deck.
- `/decks/:deckId/cards` - View the cards in a specific deck (same view as `/decks/:deckId`).
- `/decks/:deckId/cards/new` - Add a new card to the specific deck.
- `/decks/:deckId/cards/:cardId/edit` - Edit a specific card in the deck.
- `*` - Catch-all for 404 Not Found pages.


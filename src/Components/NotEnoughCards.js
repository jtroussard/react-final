import React from "react";
import { useNavigate } from "react-router-dom";

function NotEnoughCards({ numberOfCards, deckId }) {
  const navigate = useNavigate();

  const handleAddCards = () => {
    navigate(`/decks/${deckId}/cards/new`);
  };

  return (
    <>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to Study. There are {numberOfCards} in this
        deck.
      </p>
      <button className="btn btn-success" onClick={handleAddCards}>
        Add Cards
      </button>
    </>
  );
}

export default NotEnoughCards;

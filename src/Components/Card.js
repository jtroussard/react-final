import React from "react";

function Card({ card, deckId, navigate, deleteCardHandler }) {
  // Check if the card has the necessary data before rendering
  if (!card || !card.id || !card.front || !card.back) {
    return null; // Return nothing if the card data is incomplete
  }

  return (
    <div key={card.id} style={{ margin: "5px", border: "1px solid black", padding: "10px", position: "relative" }}>
      {/* Legend title at the top-right */}
      <div
        style={{
          position: "absolute",
          top: "-10px",
          right: "10px",
          backgroundColor: "white",
          padding: "0 5px",
          fontSize: "12px",
          color: "black",
        }}
      >
        Card # {card.id}
      </div>
      <p className="mb-3" style={{ outline: "2px dotted black", margin: 0, padding: "5px" }}>
        {card.front}
      </p>
      <p className="mb-3" style={{ outline: "2px dotted black", margin: 0, padding: "5px" }}>
        {card.back}
      </p>
      <button
        className="btn btn-primary"
        style={{ marginRight: "10px" }}
        onClick={() => navigate(`/decks/${deckId}/cards/${card.id}/edit`)}
      >
        Edit
      </button>
      <button className="btn btn-danger" onClick={() => deleteCardHandler(card.id)}>
        Delete
      </button>
    </div>
  );
}

export default Card;

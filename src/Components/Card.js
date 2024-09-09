import React from "react";

function Card({ card, deckId, navigate, deleteCardHandler }) {
  if (!card || !card.id || !card.front || !card.back) {
    return null; 
  }

  return (
    <div key={card.id} style={{ margin: "5px", border: "1px solid black", padding: "10px", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "-10px",
          right: "10px",
          backgroundColor: "white",
          padding: "0 5px",
          fontSize: "12px",
          color: "grey",
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
        className="btn-lg btn-primary"
        style={{ marginRight: "10px" }}
        onClick={() => navigate(`/decks/${deckId}/cards/${card.id}/edit`)}
      >
        Edit
      </button>
      <button className="btn-lg btn-danger" onClick={() => deleteCardHandler(card.id)}>
        Delete
      </button>
    </div>
  );
}

export default Card;

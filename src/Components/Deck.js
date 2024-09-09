import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDeck() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        setCards(deckResponse.cards || []);
      } catch (error) {
        console.error("Error loading deck", error);
      }
      return () => abortController.abort();
    }
    loadDeck();
  }, [deckId]);

  const deleteDeckHandler = async () => {
    const confirmed = window.confirm("Delete this deck?");
    if (confirmed) {
      await deleteDeck(deckId);
      navigate("/");
    }
  };

  const deleteCardHandler = async (cardId) => {
    const confirmed = window.confirm("Delete this card?");
    if (confirmed) {
      await deleteCard(cardId);
      setCards(cards.filter(card => card.id !== cardId));
    }
  };

  return (
    <div>
      {/* Logic for rendering deck details */}
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      
      {/* Buttons for Edit, Study, Add, and Delete */}
      {/* Card rendering logic */}
      {cards.map((card) => (
        <div key={card.id}>
          <p>{card.front}</p>
          <p>{card.back}</p>
          <button onClick={() => navigate(`/decks/${deckId}/cards/${card.id}/edit`)}>
            Edit
          </button>
          <button onClick={() => deleteCardHandler(card.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Deck;

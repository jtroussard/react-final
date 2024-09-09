import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import Card from "./Card";

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

  // Ensure cards exist and are valid before rendering
  if (!cards || !cards.length) {
    return <div>No cards found</div>;
  }

  return (
    <div className="card p-3">
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>

      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          deckId={deckId}
          navigate={navigate}
          deleteCardHandler={deleteCardHandler}
        />
      ))}
    </div>
  );
}

export default Deck;

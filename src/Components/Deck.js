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

  const controls = (
    <div className="d-flex justify-content-start mb-3">
    <button className="btn btn-success d-flex align-items-center mr-2" onClick={() => navigate(`/decks/${deck.id}/cards/new`)}>
      <span className="material-icons mr-2">add</span> Add Card
    </button>

    <button className="btn btn-danger d-flex align-items-center" onClick={() => navigate('/')}>
      <span className="material-icons mr-2">cancel</span> Cancel
    </button>
  </div>
  )

  if (!cards || !cards.length) {
    return <div>
      <h2 className="mb-3">No cards found</h2>
      {controls}
    </div>;
  }

  return (
    <div className="card p-3">
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>

      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-success d-flex align-items-center mr-2" onClick={() => navigate(`/decks/${deck.id}/cards/new`)}>
          <span className="material-icons mr-2">add</span> Add Card
        </button>

        <button className="btn btn-danger d-flex align-items-center" onClick={() => navigate('/')}>
          <span className="material-icons mr-2">cancel</span> Cancel
        </button>
      </div>


      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          deckId={deckId}
          deck={deck}
          navigate={navigate}
          deleteCardHandler={deleteCardHandler}
        />
      ))}
    </div>
  );
}

export default Deck;

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import { BASE_URL } from "../utils/globals";

function Deck() {
  const mountedRef = useRef(false);
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({ name: 'loading...', cards: [] });

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        if (mountedRef.current) {
          setDeck(() => ({ ...response }));
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    };
    fetchDeck();
    return () => { abortController.abort(); }
  }, [deckId]);

  const handleDeleteDeck = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this deck?"
    );
    if (confirmed) {
      await deleteDeck(id);
      navigate("/");
    }
  };

  const handleDeleteCard = async (cardId) => {
    const confirmed = window.confirm("Are you sure you want to delete this card?")
    if (!confirmed) return 

    try {
      const baseUrl ="http://localhost:8080";
      const response = await deleteCard(cardId)
      if (response.ok) {
        const newCards = deck.cards.filter((card) => card.id === cardId)
        setDeck({
          ...deck,
          cards: newCards
        })

      } else {
        console.log("The API call failed dude!")
      }
    } catch (error) {
      console.log(`ERROR ${error} whoops`)
    }
  }

  if (!deck) return <div>Loading...</div>;

  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <h5>{deck.name}</h5>
          <p>HELLO TEST RUNNER THE DECK NAME IS HERE ^^^^^^^^</p>
          <p>{deck.description}</p>
        </div>
        <div className="buttons">
          <button
            className="mr-2 mb-2 ml-2 btn btn-primary"
            onClick={() => navigate(`/decks/${deckId}/edit`)}
          >
            Edit Deck
          </button>
          <button
            className="mr-2 mb-2 btn btn-secondary"
            onClick={() => navigate(`/decks/${deckId}/study`)}
          >
            Study
          </button>
          <button
            className="mr-2 mb-2 btn btn-success"
            onClick={() => navigate(`/decks/${deckId}/cards/new`)}
          >
            Add Cards
          </button>
          <button
            className="mr-2 mb-2 btn btn-danger"
            onClick={() => handleDeleteDeck(deck.id)}
          >
            Delete Deck
          </button>
        </div>
      </div>
      <div>
        <h3>Cards</h3>
        {deck.cards.map((card) => (
          <div className="card mb-2" key={card.id}>
            <div className="card-body">
              <p>{card.front}</p>
              <p>{card.back}</p>
              <button
                className="btn btn-primary mr-2"
                onClick={() =>
                  navigate(`/decks/${deckId}/cards/${card.id}/edit`)
                }
              >
                Edit
              </button>
              <button
                className="btn btn-danger mr-2"
                onClick={() => handleDeleteCard(card.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deck;

import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/globals";
import { deleteDeck, listDecks } from '../utils/api/index.js';

function Home() {
  const mountedRef = useRef(false);
  const [decks, setDecks] = useState([]);
    const navigate = useNavigate();
  

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this deck?");
    if (!confirmed) return;
  
    const newDecks = decks.filter(deck => deck.id !== id);
    
    try {
      await deleteDeck(id); // No need to check response.ok as fetchJson handles errors.
      setDecks(newDecks);
      console.log('DECK DELETED');
    } catch (error) {
      console.error("Failed to delete the deck:", error);
    }
  };
  
  
  useEffect(() => {
    console.log(`Updated decks: ${JSON.stringify(decks)}`);
  }, [decks]);

    useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const decks = await listDecks();
        if (mountedRef.current) {
          setDecks((_) => [...decks]);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    }
    loadDecks();

    return () => abortController.abort();
  }, []);

  const deckRenderings = () => {
    console.log(`deckRenderings controller? ${decks.length}`);
    if (decks.length == 0) {
      return <span>Sorry there are no decks here.</span>;
    }

    return decks.map((deck, index) => {
      return (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <div className="card-title d-flex justify-content-between">
              <span>{deck.name}</span>
              <span className="badge badge-pill badge-success ml-auto mr-1">
                {deck.cards.length} cards
              </span>
            </div>
            <p className="card-text">{deck.description}</p>
            <div className="d-flex">
              <button className="btn btn-primary mr-2" onClick={() => navigate(`/decks/${deck.id}/study`)}>Study</button>
              <button className="btn btn-success" onClick={() => navigate(`/decks/${deck.id}/edit`)}>Edit</button>
              <button className="btn btn-danger ml-auto" onClick={() => handleDelete(deck.id)}>Delete</button>
            </div>
          </div>
        </div>
      );
    });
  };


  const goToCreateDeck = () => {
    navigate('/decks/new')
  }

  return (
  <div>
    <button onClick={goToCreateDeck} className="btn btn-secondary mb-2">Create Deck</button>
    {deckRenderings()}
  </div>
  );
}

export default Home;

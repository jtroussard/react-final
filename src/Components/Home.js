import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/globals";

function Home() {
  const [decks, setDecks] = useState([]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this deck?");
    if (!confirmed) return;

    console.log(id);
    const newDecks = decks.filter(deck => { 
        return deck.id !== id 
    })

    let message = "deck size did not change";
    if (newDecks.length < decks.length) {
        const response = await fetch(`${BASE_URL}/decks/${id}`, {method: 'DELETE'});
        if (response.ok) {
            setDecks(newDecks);
        } else {
            message = "API call failed"
        }
    } else {
        console.log(`Something went wrong with the delete handler function! ... ${message}`);
    }
  }

  console.log(handleDelete)

  useEffect(() => {
    console.log(`Updated decks: ${JSON.stringify(decks)}`);
  }, [decks]);

  useEffect(() => {
    const fetchDecks = async () => {
      const url = `${BASE_URL}/decks?_embed=cards`;
      console.log(`fetching decks from ${url}`);

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setDecks(data);
        } else {
          console.log("API FAILED");
        }
      } catch (error) {
        console.log(`Error making api call: ${error}`);
      }
    };
    console.log(`BEFORE ${decks}`);
    fetchDecks();
    console.log(`HAVE we set the decks? ${JSON.stringify(decks)}`);
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

  const navigate = useNavigate();
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

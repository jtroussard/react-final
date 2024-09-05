import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/globals";
import NotEnoughCards from "../Components/NotEnoughCards";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const [lastCard, setLastCard] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      const response = await fetch(`${BASE_URL}/decks/${deckId}?_embed=cards`);
      if (response.ok) {
        const data = await response.json();
        setDeck(data);
      }
    };

    fetchDeck();
  }, [deckId]);

  if (!deck) {
    return <div>Loading...</div>;
  }

  if (deck.cards.length < 3) {
    return <NotEnoughCards numberOfCards={deck.cards.length} deckId={deckId} />;
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCard < deck.cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      setLastCard(true);
      const confirmed = window.confirm("Would you like to restart the deck?");
      if (confirmed) {
        setCurrentCard(0);
        setIsFlipped(false);
        setLastCard(false);
      } else {
        navigate("/");
      }
    }
  };

  const card = currentCard < deck.cards.length ? deck.cards[currentCard] : null;

  return (
    <div>
      <h1>{deck.name}</h1>
      <div>
        <div className="card">
          <div className="card-title">
            <h2>
              Card {currentCard + 1} of {deck.cards.length}
            </h2>
          </div>
          {card && (
            <div className="card-text">
              <p>{isFlipped ? card.back : card.front}</p>
              <button className="mr-2" onClick={handleFlip}>
                Flip
              </button>
              {isFlipped && (
                <button className="mr-2" onClick={handleNext}>
                  {currentCard === deck.cards.length - 1
                    ? "Restart Deck"
                    : "Next"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;

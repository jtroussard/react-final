import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotEnoughCards from "../Components/NotEnoughCards";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await fetch(`http://localhost:8080/decks/${deckId}?_embed=cards`);
        console.log("Fetching deck data for deckId:", deckId); // Debugging
        if (response.ok) {
          const data = await response.json();
          console.log("Deck data fetched:", data); // Debugging
          setDeck(data);
        } else {
          console.error("Failed to fetch deck, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching deck:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, [deckId]);

  if (loading) return <div>Loading...</div>;

  if (!deck) return <div>Error: Deck not found</div>;

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
      const confirmed = window.confirm("Would you like to restart the deck?");
      if (confirmed) {
        setCurrentCard(0);
        setIsFlipped(false);
      } else {
        navigate("/");
      }
    }
  };

  const card = deck.cards[currentCard];

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
          <div className="card-text">
            <p>{isFlipped ? card.back : card.front}</p>
            <button className="mr-2" onClick={handleFlip}>
              Flip
            </button>
            {isFlipped && (
              <button className="mr-2" onClick={handleNext}>
                {currentCard === deck.cards.length - 1 ? "Restart Deck" : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Study;

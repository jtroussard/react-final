import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { readDeck } from '../utils/api';

function Study() {
  const mountedRef = useRef(false);
  const initialState = {
    deck: { name: 'loading...', cards: [] },
    isCardFlipped: false,
    currentIndex: 0,
  };

  const [studyState, setStudyState] = useState(initialState);
  const { deck, isCardFlipped, currentIndex } = studyState;
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        if (mountedRef.current) {
          setStudyState((currentState) => ({
            ...currentState,
            deck: loadedDeck,
          }));
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    }
    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const handleFlip = () => {
    setStudyState({
      ...studyState,
      isCardFlipped: !isCardFlipped,
    });
  };

  const handleNext = () => {
    const { cards } = deck;
    if (currentIndex === cards.length - 1) {
      const confirmed = window.confirm('Would you like to restart the deck?');
      if (confirmed) {
        setStudyState((currentState) => ({
          ...currentState,
          currentIndex: 0,
          isCardFlipped: false,
        }));
      } else {
        navigate('/');
      }
    } else {
      setStudyState((currentState) => ({
        ...currentState,
        currentIndex: currentState.currentIndex + 1,
        isCardFlipped: false,
      }));
    }
  };

  if (deck.cards.length <= 2) {
    return (
      <div>
        <h1>{deck.name}</h1>
        <div className="card">
          <div className="card-title">
            <h2>Not enough cards.</h2>
          </div>
          <div className="card-text">
            <p>You need at least 3 cards to study. Please add more cards to this deck.</p>
            <Link to={`/decks/${deckId}/cards/new`}>
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i> Add Card
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const card = deck.cards[currentIndex];

  return (
    <div>
      <h1>{deck.name}</h1>
      <div>
        <div className="card">
          <div className="card-title">
            <h2>
              Card {currentIndex + 1} of {deck.cards.length}
            </h2>
          </div>
          <div className="card-text">
            <p>{isCardFlipped ? card.back : card.front}</p>
            <button className="btn btn-secondary mr-2" onClick={handleFlip}>
              Flip
            </button>
            {isCardFlipped && (
              <button className="btn btn-primary mr-2" onClick={handleNext}>
                {currentIndex === deck.cards.length - 1 ? "Restart Deck" : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Study;

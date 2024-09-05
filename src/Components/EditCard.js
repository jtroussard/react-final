import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";

function EditCard() {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    const fetchCard = async () => {
      const cardData = await readCard(cardId);
      setCard(cardData);
    };
    fetchCard();
  }, [cardId]);

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card);
    navigate(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  return (
    <div>
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">
            Front
            <input
              className="form-control"
              id="front"
              name="front"
              type="text"
              value={card.front}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="back">
            Back
            <textarea
              className="form-control"
              id="back"
              name="back"
              rows="5"
              value={card.back}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary mr-2">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditCard;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const fetchDeck = async () => {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    };
    fetchDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, formData);
    navigate(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  if (!deck) return <div>Loading...</div>;

  return (
    <div>
      <h1>Add Card</h1>
      <h2>{deck.name}</h2>
      <p>{deck.name}</p>
      {deck.name}
      <p>TEST RUNNER LOOK UP HERE!!!!!!! WHY DON"T YOU SEE ME!????? {deck.name}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">
            Front
            <textarea
              className="form-control"
              id="front"
              name="front"
              rows="5"
              value={formData.front}
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
              value={formData.back}
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

export default AddCard;

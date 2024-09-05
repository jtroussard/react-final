import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({ name: "", description: "" });

  useEffect(() => {
    const fetchDeck = async () => {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    };
    fetchDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    navigate(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  return (
    <div>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Name
            <input
              className="form-control"
              id="name"
              name="name"
              type="text"
              value={deck.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="description">
            Description
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="5"
              value={deck.description}
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

export default EditDeck;

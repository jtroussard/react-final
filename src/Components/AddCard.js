import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCard } from "../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

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

  return (
    <div>
      <h2>Add Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">
            Front
            <input
              className="form-control"
              id="front"
              name="front"
              type="text"
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

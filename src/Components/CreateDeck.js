import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { name, description };
  
    try {
      const newDeck = await createDeck(formData);
      navigate(`/decks/${newDeck.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };
  

  const handleCancel = () => {
    navigate("/")
  }

  return (
    <div>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="name">
          Name
          <input
          className="form-control w-100"
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
          ></input>
        </label>
        </div>
        <div className="form-group">
        <label htmlFor="description">
          Description
          <textarea
          className="form-control w-100"
            id="description"
            description="description"
            value={description}
            rows="5"
            onChange={handleDescriptionChange}
          ></textarea>
        </label>
        </div>
        <button type="submit" className="btn btn-primary mr-2">Submit</button>
        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateDeck;

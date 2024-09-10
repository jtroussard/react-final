import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import FormComponent from "./FormComponent";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({ front: "", back: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchDeck = async () => {
      try {
        console.log(`Fetching deck with id: ${deckId}`); 
        const deckData = await readDeck(deckId);
        setDeck(deckData);
        console.log("Deck fetched successfully:", deckData); 
      } catch (error) {
        console.error("Error fetching deck:", error); 
      }
    };
    fetchDeck();
  }, [deckId]);

  
  const handleSubmit = async (newCardData) => {
    if (!newCardData.front || !newCardData.back) {
      alert("Both front and back must be filled out!");
      return;
    }
    console.log("Submitting card:", newCardData); 
    setIsSubmitting(true); 
    try {
      await createCard(deckId, newCardData);
      console.log("Card created successfully"); 
      setFormData({ front: "", back: "" }); 
    } catch (error) {
      console.error("Error creating card:", error); 
    } finally {
      setIsSubmitting(false); 
    }
  };

  
  const handleFormChange = (updatedFormData) => {
    setFormData(updatedFormData);
  };

  
  const handleCancel = () => {
    console.log("Navigating to deck overview"); 
    navigate(`/decks/${deckId}`);
  };

  
  if (!deck) return <div>Loading...</div>;

  return (
    <div>
      <h1>Add Card</h1>
      <h2>{deck.name}</h2>
      {/* Pass form data and handlers to FormComponent */}
      <FormComponent
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AddCard;

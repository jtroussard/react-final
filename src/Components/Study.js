import React from "react";
import { useParams } from "react-router-dom";

function Study() {
  const { deckId } = useParams();
  return <div>Study Screen for Deck ID: {deckId}</div>;
}

export default Study;
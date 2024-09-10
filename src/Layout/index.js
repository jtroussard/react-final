import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";

import Home from "../Components/Home";
import CreateDeck from "../Components/CreateDeck";
import Study from "../Components/Study";
import Deck from "../Components/Deck";
import EditDeck from "../Components/EditDeck";
import AddCard from "../Components/AddCard";
import EditCard from "../Components/EditCard";

function Layout() {
  const location = useLocation();

  const breadcrumbRenderings = () => {
    const paths = location.pathname.split("/").filter((path) => path);

    if (location.pathname === "/") return null;

    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          {paths.map((path, index) => {
            const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
            const breadcrumbLabel =
              path.charAt(0).toUpperCase() + path.slice(1);
            return (
              <li key={index} className="breadcrumb-item">
                <Link to={fullPath}>{breadcrumbLabel}</Link>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  };

  return (
    <div>
      <Header />
      <div className="container">
        {breadcrumbRenderings()}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks" element={<Home />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} /> 
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/decks/:deckId" element={<Deck />} />
          <Route path="/decks/:deckId/cards" element={<Deck />} />
          
          
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;

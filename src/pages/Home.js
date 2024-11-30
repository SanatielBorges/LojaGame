import React, { useState } from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import CategoryButtons from "../components/CategoryButtons";
import AllGamesGrid from "../components/AllGamesGrid";
import FpsGamesGrid from "../components/FpsGamesGrid";
import RpgGamesGrid from "../components/RpgGamesGrid";
import AventGamesGrid from "../components/AventGamesGrid";
import CartAndFavorites from "../components/CartAndFavorites";
import styled from "styled-components";

const SiteTitle = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;

const CategoryTitle = styled.h2`
  margin: 2rem 0 1rem 0;
  text-align: center;
`;

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const addToFavorites = (game) => {
    setFavorites((prevFavorites) => [...prevFavorites, game]);
  };

  const removeFromFavorites = (game) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== game.id)
    );
  };

  const addToCart = (game) => {
    setCart((prevCart) => [...prevCart, game]);
  };

  const removeFromCart = (game) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== game.id));
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <CartAndFavorites
        favoriteCount={favorites.length}
        cartCount={cart.length}
        favorites={favorites}
        cart={cart}
        setFavorites={setFavorites}
        setCart={setCart}
      />
      <SiteTitle>
        S & N Games <br /> Porque jogar é viver.
      </SiteTitle>
      <Carousel />
      <CategoryButtons
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      <CategoryTitle>{selectedCategory} Jogos</CategoryTitle>
      {selectedCategory === "Todos" && (
        <AllGamesGrid
          searchText={searchText}
          favorites={favorites}
          cart={cart}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      )}
      {selectedCategory === "FPS" && (
        <FpsGamesGrid
          searchText={searchText}
          favorites={favorites}
          cart={cart}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      )}
      {selectedCategory === "RPG" && (
        <RpgGamesGrid
          searchText={searchText}
          favorites={favorites}
          cart={cart}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      )}
      {selectedCategory === "Aventura" && (
        <AventGamesGrid
          searchText={searchText}
          favorites={favorites}
          cart={cart}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  );
};

export default Home;

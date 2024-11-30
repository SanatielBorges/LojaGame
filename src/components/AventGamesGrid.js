import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem;
  justify-content: flex-start;
`;

const GameCard = styled.div`
  flex: 1 1 calc(25% - 1rem);
  max-width: calc(25% - 1rem);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 1rem);
    max-width: calc(50% - 1rem);
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

const GameImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
const GameInfo = styled.div`
  padding: 1rem;
  background: linear-gradient(to bottom, black, navy);
  color: white;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GameTitle = styled.p`
  margin-bottom: -0.8rem;
`;

const GamePrice = styled.p`
  color: #fff;
  letter-spacing: 0.2rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  background-color: #0056b3;
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
  }
`;
const AventGamesGrid = ({
  searchText,
  favorites,
  cart,
  addToFavorites,
  removeFromFavorites,
  addToCart,
  removeFromCart,
}) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = "0a6f7688c6d741b2845445e4b9ae029c";
    axios
      .get(`https://api.rawg.io/api/games?key=${apiKey}&genres=adventure`)
      .then((response) => {
        const gamesWithPrices = response.data.results.map((game) => ({
          ...game,
          img: game.background_image,
          title: game.name,
          price: `R$ ${(Math.random() * (200 - 100) + 100)
            .toFixed(2)
            .replace(".", ",")}`,
        }));
        setGames(gamesWithPrices);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch games:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredGames = games.filter((game) =>
    game.title && searchText
      ? game.title.toLowerCase().includes(searchText.toLowerCase())
      : true
  );
  return (
    <GridContainer>
      {filteredGames.map((game) => {
        const isFavorite = favorites.some((fav) => fav.id === game.id);
        const inCart = cart.some((item) => item.id === game.id);

        return (
          <GameCard key={game.id}>
            <GameImageContainer>
              <GameImage src={game.img} alt={game.title} />
            </GameImageContainer>
            <GameInfo>
              <GameTitle>{game.title}</GameTitle>
              <GamePrice>{game.price}</GamePrice>
            </GameInfo>
            <ButtonsContainer>
              <ActionButton
                onClick={() =>
                  isFavorite ? removeFromFavorites(game) : addToFavorites(game)
                }
              >
                {isFavorite
                  ? "Remover dos Favoritos"
                  : "Adicionar aos Favoritos"}
              </ActionButton>
              <ActionButton
                onClick={() =>
                  inCart ? removeFromCart(game) : addToCart(game)
                }
              >
                {inCart ? "Remover do Carrinho" : "Adicionar ao Carrinho"}
              </ActionButton>
            </ButtonsContainer>
          </GameCard>
        );
      })}
    </GridContainer>
  );
};

export default AventGamesGrid;

import React from "react";
import styled from "styled-components";

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
  font-size: 1rem;
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

const SearchResults = ({
  searchResults,
  favorites,
  cart,
  addToFavorites,
  removeFromFavorites,
  addToCart,
  removeFromCart,
}) => {
  return (
    <GridContainer>
      {searchResults.map((game) => {
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

export default SearchResults;

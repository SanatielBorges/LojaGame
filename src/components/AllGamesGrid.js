import React from "react";
import styled from "styled-components";
import battlefield3 from "../images/fps-Battlefield 3.jpg";
import doom from "../images/fps-DOOM.avif";
import farCry3 from "../images/fps-Far Cry 3.jpg";
import overwatch from "../images/fps-Overwatch.jpg";
import rainbowSixSiege from "../images/fps-Rainbow Six Siege.png";
import callOfDuty from "../images/fps-call-of-duty.webp";
import chronoCross from "../images/rpg-Chrono Cross.avif";
import divinityOriginalSin from "../images/rpg-Divinity - Original Sin II.avif";
import finalFantasyIX from "../images/rpg-Final Fantasy IX.webp";
import elderScrollsV from "../images/rpg-The Elder Scrolls V.avif";
import baldursGate3 from "../images/rpg-Baldur's Gate 3.avif";
import aventHorizon from "../images/Avent-Horizon Zero Dawn.webp";
import redDeadRedemption from "../images/Avent-Red Dead Redemption 2.jpg";
import lastOfUs from "../images/Avent-The Last of Us Part II.avif";
import godOfWar from "../images/Avent-god-of-war.jpg";
import uncharted4 from "../images/avent-Uncharted 4.webp";

const games = [
  {
    id: 1,
    img: battlefield3,
    title: "Battlefield 3",
    price: "R$ 199,99",
  },
  {
    id: 2,
    img: doom,
    title: "DOOM",
    price: "R$ 149,99",
  },
  {
    id: 3,
    img: farCry3,
    title: "Far Cry 3",
    price: "R$ 179,99",
  },
  {
    id: 4,
    img: overwatch,
    title: "Overwatch",
    price: "R$ 129,99",
  },
  {
    id: 5,
    img: rainbowSixSiege,
    title: "Rainbow Six Siege",
    price: "R$ 159,99",
  },
  {
    id: 6,
    img: callOfDuty,
    title: "Call of Duty",
    price: "R$ 189,99",
  },
  {
    id: 7,
    img: chronoCross,
    title: "Chrono Cross",
    price: "R$ 99,99",
  },
  {
    id: 8,
    img: divinityOriginalSin,
    title: "Divinity Original Sin II",
    price: "R$ 139,99",
  },
  {
    id: 9,
    img: finalFantasyIX,
    title: "Final Fantasy IX",
    price: "R$ 119,99",
  },
  {
    id: 10,
    img: elderScrollsV,
    title: "The Elder Scrolls V",
    price: "R$ 149,99",
  },
  {
    id: 11,
    img: baldursGate3,
    title: "Baldur's Gate 3",
    price: "R$ 199,99",
  },
  {
    id: 12,
    img: aventHorizon,
    title: "Horizon Zero Dawn",
    price: "R$ 179,99",
  },
  {
    id: 13,
    img: redDeadRedemption,
    title: "Red Dead Redemption 2",
    price: "R$ 199,99",
  },
  {
    id: 14,
    img: lastOfUs,
    title: "The Last of Us Part II",
    price: "R$ 189,99",
  },
  {
    id: 15,
    img: godOfWar,
    title: "God of War",
    price: "R$ 159,99",
  },
  {
    id: 16,
    img: uncharted4,
    title: "Uncharted 4",
    price: "R$ 169,99",
  },
];

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
  height: 200px;
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

const AllGamesGrid = ({
  searchText,
  favorites,
  cart,
  addToFavorites,
  removeFromFavorites,
  addToCart,
  removeFromCart,
}) => {
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchText.toLowerCase())
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

export default AllGamesGrid;

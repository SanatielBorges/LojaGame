import React from "react";
import styled from "styled-components";

const SectionContainer = styled.section`
  margin: 2rem 0;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const GameCard = styled.div`
  padding: 1rem;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  text-align: center;
`;

const GameImage = styled.img`
  width: 100%;
  height: auto;
`;

const Section = ({ title, games }) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionGrid>
        {games.map((game) => (
          <GameCard key={game.id}>
            <GameImage src={game.img} alt={game.title} />
            <h3>{game.title}</h3>
            <p>R$ {game.price.toFixed(2)}</p>
          </GameCard>
        ))}
      </SectionGrid>
    </SectionContainer>
  );
};

export default Section;

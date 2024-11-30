import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;

  @media (max-width: 480px) {
    flex-wrap: wrap; /* Permite que os botões caiam para a linha de baixo */
    justify-content: center; /* Centraliza os botões */
  }
`;

const CategoryButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  background-color: ${(props) => (props.selected ? "#0056b3" : "#007bff")};

  &:hover {
    background-color: ${(props) => (props.selected ? "#003d80" : "#0056b3")};
    transition: ease all 0.3s;
  }

  @media (max-width: 480px) {
    margin: 0.5rem 0; /* Ajusta a margem para telas menores */
    width: 90%; /* Garante que os botões ocupem a maior parte da largura da tela */
  }
`;

const CategoryButtons = ({ selectedCategory, onSelectCategory }) => {
  return (
    <ButtonContainer>
      <CategoryButton
        selected={selectedCategory === "Todos"}
        onClick={() => onSelectCategory("Todos")}
      >
        Todos os Jogos
      </CategoryButton>
      <CategoryButton
        selected={selectedCategory === "FPS"}
        onClick={() => onSelectCategory("FPS")}
      >
        FPS
      </CategoryButton>
      <CategoryButton
        selected={selectedCategory === "RPG"}
        onClick={() => onSelectCategory("RPG")}
      >
        RPG
      </CategoryButton>
      <CategoryButton
        selected={selectedCategory === "Aventura"}
        onClick={() => onSelectCategory("Aventura")}
      >
        Aventura
      </CategoryButton>
    </ButtonContainer>
  );
};

export default CategoryButtons;

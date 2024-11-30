import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaSearch } from "react-icons/fa";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(to bottom, navy, black);
  color: #fff;
  flex-wrap: wrap; /* Permite que os itens se reagrupem em telas menores */

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    padding: 1rem 0.5rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    margin: 0 auto;
    width: 80%;
    justify-content: flex-end;
  }
`;

const SearchIcon = styled(FaSearch)`
  cursor: pointer;
  z-index: 1;
  margin-right: 8px; /* Espaço entre a lupa e o input */
`;

const expand = keyframes`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 200px;
    opacity: 1;
  }
`;

const collapse = keyframes`
  from {
    width: 200px;
    opacity: 1;
  }
  to {
    width: 0;
    opacity: 0;
  }
`;

const SearchInput = styled.input`
  position: absolute;
  right: 0;
  padding: 0.5rem;
  border: 1px solid white;
  border-radius: 5px;
  outline: none;
  transition: width 0.3s ease, opacity 0.3s ease;
  animation: ${(props) => (props.visible ? expand : collapse)} 0.3s forwards;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.5rem;
    animation: none; /* Desativar animação em telas menores */
  }
`;

const Header = ({ onSearch }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (!searchVisible) {
      setSearchText("");
      onSearch(""); // Limpar a pesquisa ao clicar na lupa
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <HeaderContainer>
      <Logo>S & N Games</Logo>
      <SearchContainer>
        <SearchIcon onClick={toggleSearch} />
        <SearchInput
          type="text"
          placeholder="Pesquisar..."
          visible={Boolean(searchVisible)}
          value={searchText}
          onChange={handleSearchChange}
        />
      </SearchContainer>
    </HeaderContainer>
  );
};

export default Header;

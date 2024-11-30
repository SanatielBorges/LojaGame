import React, { useState } from "react";
import styled from "styled-components";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Modal from "react-modal";

const CartAndFavoritesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(to bottom, black, navy);
  color: white;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const ItemCount = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: ${(props) => props.color || "red"};
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
`;

const ModalWrapper = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  @media (max-width: 480px) {
    margin: 0.5rem 0;
  }
`;

const ModalContent = styled.div`
  background: rgba(0, 0, 0, 0.93);
  color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 80%;
  max-height: 90%;
  overflow-y: auto;

  @media (max-width: 480px) {
    width: 90%;
    padding: 1rem; /* Ajusta o padding para telas menores */
  }
`;

const ScrollableDiv = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 1rem;
  border-radius: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 0.5rem 0.5rem 0 0;

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  background-color: red;
  border: none;
  border-radius: 50%;
  color: white;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: orange;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #007bff;
  background-color: transparent;
  color: white;
  width: 150px;
  margin-right: 0.5rem;

  @media (max-width: 480px) {
    width: 100%; /* Ajusta a largura para telas menores */
    margin-right: 0; /* Remove a margem direita em telas menores */
  }
`;

const CouponInfo = styled.div`
  margin-top: 1rem;
  color: yellow;
`;

const CartAndFavorites = ({
  favoriteCount,
  cartCount,
  favorites,
  cart,
  setFavorites,
  setCart,
}) => {
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const handleFavoritesClick = () => {
    setIsFavoritesModalOpen(true);
  };

  const handleCartClick = () => {
    setIsCartModalOpen(true);
  };

  const closeFavoritesModal = () => {
    setIsFavoritesModalOpen(false);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handleAddAllFavoritesToCart = () => {
    setCart((prevCart) => [...prevCart, ...favorites]);
    setFavorites([]);
    closeFavoritesModal();
  };

  const handleRemoveAllFavorites = () => {
    setFavorites([]);
    closeFavoritesModal();
  };

  const handleEmptyCart = () => {
    setCart([]);
    setCoupon(""); // Limpar o campo de cupom
    setIsCouponApplied(false); // Resetar o status do cupom
    closeCartModal();
  };

  const handleCheckout = () => {
    alert("Compra finalizada com sucesso!");
    setCart([]);
    setCoupon(""); // Limpar o campo de cupom
    setIsCouponApplied(false); // Resetar o status do cupom
    closeCartModal();
  };

  const handleApplyCoupon = () => {
    if (!isCouponApplied) {
      if (coupon === "DESCONTO10") {
        setDiscount(0.1); // 10% de desconto
        setIsCouponApplied(true);
        alert("Cupom aplicado com sucesso!");
      } else {
        alert("Cupom inválido!");
      }
    } else {
      alert("O cupom já foi utilizado!");
    }
    setCoupon(""); // Limpar o campo de cupom após a aplicação
  };

  const totalAmount = cart.reduce((total, game) => {
    if (typeof game.price === "string") {
      return (
        total + parseFloat(game.price.replace("R$ ", "").replace(",", "."))
      );
    }
    return total;
  }, 0);

  const discountedAmount = totalAmount * (1 - discount);

  const addToFavorites = (game) => {
    if (game.background_image && game.name && game.price) {
      const gameData = {
        ...game,
        img: game.background_image,
        title: game.name,
      };
      setFavorites((prevFavorites) => [...prevFavorites, gameData]);
    } else {
      console.error("Dados do jogo incompletos:", game);
    }
  };

  const addToCart = (game) => {
    if (game.background_image && game.name && game.price) {
      const gameData = {
        ...game,
        img: game.background_image,
        title: game.name,
      };
      setCart((prevCart) => [...prevCart, gameData]);
    } else {
      console.error("Dados do jogo incompletos:", game);
    }
  };

  const removeFromFavorites = (game) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== game.id)
    );
  };

  const removeFromCart = (game) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== game.id));
  };

  return (
    <>
      <CartAndFavoritesContainer>
        <IconContainer>
          <IconWrapper onClick={handleFavoritesClick}>
            <FaHeart color={favoriteCount > 0 ? "red" : "white"} size={24} />
            {favoriteCount > 0 && (
              <ItemCount color="orange">{favoriteCount}</ItemCount>
            )}
          </IconWrapper>
          <IconWrapper onClick={handleCartClick}>
            <FaShoppingCart
              color={cartCount > 0 ? "yellow" : "white"}
              size={24}
            />
            {cartCount > 0 && <ItemCount>{cartCount}</ItemCount>}
          </IconWrapper>
        </IconContainer>
      </CartAndFavoritesContainer>
      <ModalWrapper
        isOpen={isFavoritesModalOpen}
        onRequestClose={closeFavoritesModal}
      >
        <ModalContent>
          <h2>Favoritos</h2>
          {favorites.length > 0 ? (
            <ScrollableDiv>
              {favorites.map((game) => (
                <div
                  key={game.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={game.img}
                    alt={game.title}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  <p>
                    {game.title} - {game.price}
                  </p>
                  <CloseButton onClick={() => removeFromFavorites(game)}>
                    X
                  </CloseButton>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <Button onClick={handleAddAllFavoritesToCart}>
                  Adicionar Todos ao Carrinho
                </Button>
                <Button onClick={handleRemoveAllFavorites}>
                  Remover Todos
                </Button>
              </div>
            </ScrollableDiv>
          ) : (
            <p>Não há itens favoritos.</p>
          )}
          <Button onClick={closeFavoritesModal}>Fechar</Button>
        </ModalContent>
      </ModalWrapper>
      <ModalWrapper isOpen={isCartModalOpen} onRequestClose={closeCartModal}>
        {" "}
        <ModalContent>
          {" "}
          <h2>Carrinho</h2>{" "}
          {cart.length > 0 ? (
            <ScrollableDiv>
              {" "}
              {cart.map((game) => (
                <div
                  key={game.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {" "}
                  <img
                    src={game.img}
                    alt={game.title}
                    style={{ width: "50px", marginRight: "10px" }}
                  />{" "}
                  <p>
                    {" "}
                    {game.title} - {game.price}{" "}
                  </p>{" "}
                  <CloseButton onClick={() => removeFromCart(game)}>
                    {" "}
                    X{" "}
                  </CloseButton>{" "}
                </div>
              ))}{" "}
              <div style={{ marginTop: "1rem" }}>
                {" "}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {" "}
                  <Input
                    type="text"
                    placeholder="Cupom de Desconto"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />{" "}
                  <Button onClick={handleApplyCoupon}>Aplicar Cupom</Button>{" "}
                </div>{" "}
                <CouponInfo>Use o cupom: DESCONTO10</CouponInfo>{" "}
              </div>{" "}
              <p>Total: R$ {totalAmount.toFixed(2)}</p>{" "}
              {isCouponApplied && (
                <>
                  {" "}
                  <p>Desconto aplicado: {discount * 100}%</p>{" "}
                  <p>Valor com desconto: R$ {discountedAmount.toFixed(2)}</p>{" "}
                </>
              )}{" "}
              <div style={{ display: "flex", gap: "1rem" }}>
                {" "}
                <Button onClick={handleEmptyCart}>
                  Esvaziar Carrinho
                </Button>{" "}
                <Button onClick={handleCheckout}>Finalizar Compra</Button>{" "}
              </div>{" "}
            </ScrollableDiv>
          ) : (
            <p>Não há itens no carrinho.</p>
          )}{" "}
          <Button onClick={closeCartModal}>Fechar</Button>{" "}
        </ModalContent>{" "}
      </ModalWrapper>{" "}
    </>
  );
};
export default CartAndFavorites;

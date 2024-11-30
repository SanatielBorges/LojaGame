import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import game1 from "../images/Avent-Horizon Zero Dawn.webp";
import game2 from "../images/fifa2024.webp";
import game3 from "../images/fps-Battlefield 3.jpg";
import game4 from "../images/rpg-Divinity - Original Sin II.avif";

const CarouselContainer = styled.div`
  margin: 2rem 0;
  width: 100%;

  .slick-dots li button:before {
    font-size: 0.6rem; /* Ajustar o tamanho das bolinhas */
  }
  .slick-dots li.slick-active button:before {
    color: red; /* Cor da bolinha ativa */
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 5px;
`;

const Slide = styled.div`
  padding: 0 1%; /* Espaçamento entre as imagens: 2% dividido por 2 lados */
  width: 23%; /* Cada imagem ocupa 23% da largura do container */
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box; /* Inclui o padding dentro da largura do elemento */
  border-radius: 5px;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem; /* Aumentar o tamanho das setas */
  cursor: pointer;
  z-index: 2;
  ${(props) => (props.left ? "left: 10px" : "right: 10px")};
`;

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Arrow className={className} style={{ ...style }} onClick={onClick} left>
      ◀
    </Arrow>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Arrow className={className} style={{ ...style }} onClick={onClick} right>
      ▶
    </Arrow>
  );
};

const games = [
  { id: 1, img: game1, title: "Game 1" },
  { id: 2, img: game2, title: "Game 2" },
  { id: 3, img: game3, title: "Game 3" },
  { id: 4, img: game4, title: "Game 4" },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {games.map((game) => (
          <Slide key={game.id}>
            <CarouselImage src={game.img} alt={game.title} />
          </Slide>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default Carousel;

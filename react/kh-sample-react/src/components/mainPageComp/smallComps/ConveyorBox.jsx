import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookInfo } from "../../../contexts/BookInfoContext";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// SliderWrapper 스타일링
const SliderWrapper = styled.div`
  width: 1920px;

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    padding: 40px;
    object-fit: contain;
    will-change: transform;

    &:hover {
      img {
        transform: scale(1.1);
        transition: 0.3s linear;
      }
      &:nth-child(odd) {
        img {
          transform: scale(1.1) rotateZ(-5deg);
        }
      }
      &:nth-child(even) {
        img {
          transform: scale(1.1) rotateZ(5deg);
        }
      }
    }
  }

  .slick-track {
    display: flex;
  }
`;

// ImageSliderItem 스타일링
const ImageSliderItem = styled.img`
  width: 300px;
  height: 350px;
  max-width: 350px;
  max-height: 350px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: transform 0.5s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  @media (max-width: 1450px) {
    width: 200px;
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 200px;
  }
`;

// ToggleSlidersWrapper 스타일링
const ToggleSlidersWrapper = styled.div`
  transition: opacity 2s, max-height 2s; // visibility 속성을 제거했습니다.
  max-height: ${(props) =>
    props.$isVisible
      ? "auto"
      : "0px"}; // 'auto' 대신 실제 높이 예상치를 입력하세요.
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};
  overflow: hidden;
  position: relative;
  z-index: 10;
`;

// ToggleButton 스타일링
const ToggleButton = styled.button`
  padding: 10px 20px;
  margin: 20px;
  cursor: pointer;
  border: none;
  background-color: #333;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

// ConveyorBox 컴포넌트
const ConveyorBox = ({ images = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { books, refreshBooks } = useBookInfo();

  useEffect(() => {
    refreshBooks();
  }, []);

  // console.log(books);

  const settings = {
    infinite: true,
    speed: 20000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
  };

  const reverseSettings = {
    ...settings,
    rtl: true,
  };

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleImageClick = (id) => {
    navigate(`/AboutBookPage/${id}`); // 'navigate' 함수에 경로를 직접 전달합니다.
  };

  return (
    <>
      <SliderWrapper>
        <Slider {...settings}>
          {books.map((book, index) => (
            <div key={book.id || index}>
              <ImageSliderItem
                src={book.imageUrl}
                alt={`book-image-${index}`}
                onClick={() => handleImageClick(book.id)}
              />
            </div>
          ))}
        </Slider>
        <Slider {...reverseSettings}>
          {books.map((book, index) => (
            <div key={book.id || index}>
              <ImageSliderItem
                src={book.imageUrl}
                alt={`book-image-${index}`}
                onClick={() => handleImageClick(book.id)}
              />
            </div>
          ))}
        </Slider>
      </SliderWrapper>

      {isVisible && (
        <ToggleSlidersWrapper $isVisible={isVisible}>
          <SliderWrapper>
            <Slider {...settings}>
              {books.map((book, index) => (
                <div key={book.id || index}>
                  <ImageSliderItem
                    src={book.imageUrl}
                    alt={`book-image-${index}`}
                    onClick={() => handleImageClick(book.id)}
                  />
                </div>
              ))}
            </Slider>
          </SliderWrapper>
          <SliderWrapper>
            <Slider {...reverseSettings}>
              {books.map((book, index) => (
                <div key={book.id || index}>
                  <ImageSliderItem
                    src={book.imageUrl}
                    alt={`book-image-${index}`}
                    onClick={() => handleImageClick(book.id)}
                  />
                </div>
              ))}
            </Slider>
          </SliderWrapper>
          <SliderWrapper>
            <Slider {...settings}>
              {books.map((book, index) => (
                <div key={book.id || index}>
                  <ImageSliderItem
                    src={book.imageUrl}
                    alt={`book-image-${index}`}
                    onClick={() => handleImageClick(book.id)}
                  />
                </div>
              ))}
            </Slider>
          </SliderWrapper>
        </ToggleSlidersWrapper>
      )}

      <ToggleButton onClick={handleToggle}>
        {isVisible ? "Hide Sliders" : "Show Sliders"}
      </ToggleButton>
    </>
  );
};

export default ConveyorBox;

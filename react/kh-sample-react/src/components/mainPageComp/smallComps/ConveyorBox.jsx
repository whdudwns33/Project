import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookInfo } from "../../../contexts/BookInfoContext";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;
// SliderWrapper 스타일링
const SliderWrapper = styled.div`
  width: 1920px;

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 30px;
    margin-right: 30px;
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

// 리렌더링 되었을때 간지나게 초밥벨트 등장
const StyledSliderWrapper = styled(SliderWrapper)`
  opacity: 0;
  transform: translateY(10px);
  animation: fadeIn 1s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
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

// Button 스타일링
const Button = styled.button`
  margin: 5px;
  border: 1.8px solid #242424;
  font-weight: bolder;
  padding: 6px 16px;
  background-color: var(--gray);
  color: var(--black);
  border-radius: 100px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--black);
    color: var(--white);
  }
`;

// ConveyorBox 컴포넌트
const ConveyorBox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { books } = useBookInfo(); // API 호출 함수 사용

  // 정렬 기준을 위한 useState
  const [sortedBooks, setSortedBooks] = useState([]);
  // 정렬이 됐으면 리렌더링을 해야 된다더라 아오
  const [reRender, setReRender] = useState(false);
  const [activeSortOrder, setActiveSortOrder] = useState("");

  const sortBooks = (order) => {
    if (order === activeSortOrder) {
      // 이미 활성화된 정렬 기준이면 정렬 x , 빡세다 빡세
      return;
    }
    let sorted;
    if (order === "latest") {
      // parseInt로 정수형으로 변경하면 , 해당 함수는 xxxx-xx-xx 인 경우 - 가 인식 되면 중단돰 , 그래서 날짜로 타입변환후 비교
      sorted = [...books].sort(
        (a, b) =>
          new Date(b.publishYear).getTime() - new Date(a.publishYear).getTime()
      );
      // console.log(sorted);
    } else if (order === "bestselling") {
      sorted = [...books].sort((a, b) => b.purchaseCount - a.purchaseCount);
      // console.log(sorted);
    }
    setSortedBooks(sorted);
    setReRender((prev) => !prev);
    setActiveSortOrder(order);
  };

  const handleSortChange = (order) => {
    sortBooks(order);
  };

  const handleImageClick = (id) => {
    console.log(id);
    navigate("/PurchasePage", { state: { bookId: id } });
  };

  const renderSlider = (settings) => (
    <Slider {...settings}>
      {sortedBooks.map((book, index) => (
        <div key={book.id || index}>
          <ImageSliderItem
            src={book.imageUrl}
            alt={"이미지"}
            onClick={() => handleImageClick(book.id)}
          />
        </div>
      ))}
    </Slider>
  );

  useEffect(() => {
    setSortedBooks(books);
    // console.log(books);
  }, [books]);

  // 회전 초밥 설정
  const settings = {
    infinite: true,
    speed: 20000,
    slidesToShow: 3, // 데이터 베이스에 존재하는 책의 숫자보다 적게 설정
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10,
    cssEase: "linear",
  };

  const reverseSettings = { ...settings, rtl: true };

  return (
    <>
      <ButtonWrapper>
        <Button onClick={() => handleSortChange("latest")}>최신순</Button>
        <Button onClick={() => handleSortChange("bestselling")}>판매순</Button>
      </ButtonWrapper>
      {/* reRender 상태에 따라 슬라이더 표시 */}
      {reRender && (
        <StyledSliderWrapper>{renderSlider(settings)}</StyledSliderWrapper>
      )}
      {reRender && (
        <StyledSliderWrapper>
          {renderSlider(reverseSettings)}
        </StyledSliderWrapper>
      )}
      <SliderWrapper>{renderSlider(settings)}</SliderWrapper>
      <SliderWrapper>{renderSlider(reverseSettings)}</SliderWrapper>

      {isVisible && (
        <ToggleSlidersWrapper $isVisible={isVisible}>
          <SliderWrapper>{renderSlider(settings)}</SliderWrapper>
          <SliderWrapper>{renderSlider(reverseSettings)}</SliderWrapper>
          <SliderWrapper>{renderSlider(settings)}</SliderWrapper>
          {/* reRender 상태에 따라 슬라이더 표시 */}
          {reRender && (
            <StyledSliderWrapper>{renderSlider(settings)}</StyledSliderWrapper>
          )}
          {reRender && (
            <StyledSliderWrapper>
              {renderSlider(reverseSettings)}
            </StyledSliderWrapper>
          )}
        </ToggleSlidersWrapper>
      )}
      <Button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "숨기기" : "더보기"}
      </Button>
    </>
  );
};

export default ConveyorBox;

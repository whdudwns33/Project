import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Draggable from "react-draggable";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import haize from "../image/헤이즈.jpg";

const Img = styled.img`
  z-index: 15;
  background-image: url();
`;

const StyledSlider = styled(Slider)`
  .slick-prev {
    z-index: 1;
    left: 30px;
  }

  .slick-next {
    right: 40px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    opacity: 0.5;
    color: white;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 30px;
    color: white;

    li button:before {
      color: white;
    }

    li.slick-active button:before {
      color: white;
    }
  }
`;

const SimpleSlider = () => {
  // 슬라이더 설정
  const settings = {
    dots: true, // 페이지 번호 표시
    infinite: true, // 무한 반복
    speed: 1500, // 슬라이딩 속도
    slidesToShow: 2, // 화면에 보일 슬라이드 수
    slidesToScroll: 1, // 한 번에 슬라이딩할 슬라이드 수
  };

  return (
    <div>
      <h2>Simple Slider</h2>
      <StyledSlider {...settings}>
        <Draggable axis="x">
          <div>{/* <Img src={haize} alt="사진1" /> */}</div>
        </Draggable>
        <Draggable axis="x">
          <div>{/* <Img src={haize} alt="사진1" /> */}</div>
        </Draggable>
        <Draggable axis="x">
          <div>{/* <Img src={haize} alt="사진1" /> */}</div>
        </Draggable>
        {/* 추가 이미지를 필요한 만큼 넣을 수 있습니다 */}
      </StyledSlider>
    </div>
  );
};

export default SimpleSlider;

import styled from "styled-components";

// 기본 컨테이너: 전체 레이어
export const Container = styled.div`
  // PC
  @media (min-width: 451px) {
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    width: 80vw;
    height: 100vh;
    flex-wrap: wrap;
    display: flex;
    min-width: 1440px;
    min-height: 1000px;
    justify-content: space-evenly;
    background-color: #fff;
  }
  // 모바일
  @media (max-width: 450px) {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
`;

// 좌측 레이어, 모바일은 전체
// 좌측(이미지 및 정보보여주기, 정보 출력)
export const Left = styled.div`
  // PC
  @media (min-width: 451px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    height: 98%;
    margin-top: 5px;
    border-radius: 10px;
    box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
    background: #ebecf0;
  }
  // 모바일
  @media (max-width: 450px) {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
    background: #ebecf0;
  }
`;
// 좌측 상단 이미지 및 정보 부모 레이어, 모바일은 최상단
export const LeftTop = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // 모바일
  @media (max-width: 450px) {
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;
// 이미지 레이어
export const Imagine = styled.div`
  box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
  border-radius: 5%;
  width: 50%;
  height: 50%;
  margin-bottom: 5%;

  @media (max-width: 450px) {
    width: 50%;
    height: 50%;
  }

  background-image: url("/태연.jpg");
`;
// 정보 레이어
export const InfoBox = styled.div`
  width: 80%;
  height: 30%;
  display: flex;
  flex-wrap: wrap;
  box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
  justify-content: space-around;

  @media (max-width: 450px) {
    width: 80%;
    align-items: center;
  }
`;
// 정보의 이름 레이어
export const InfoName = styled.div`
  width: 100px;
  margin-top: 1%;
  margin-bottom: 10px;

  @media (max-width: 450px) {
    margin: 0;
  }
`;

// 좌측 하단 전체 레이어
export const LeftBottom = styled.div`
  @media (min-width: 451px) {
    width: 80%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
  }
  @media (max-width: 450px) {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
// 좌측 하단 버튼들의 레이어
export const LeftButton = styled.div`
  @media (min-width: 451px) {
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid red;
  }
  @media (max-width: 450px) {
    width: 80%;
    height: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid red;
    flex-wrap: wrap;
  }
`;

// 우측 레이어, 모바일시 어퍼 레이어
// 우측 실제로 정보를 변경하는 레이어
export const Right = styled.div`
  // PC
  @media (min-width: 451px) {
    background-color: #ff4b2b;
    border-radius: 10px;
    width: 50%;
    height: 98%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    margin-top: 5px;
    box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
  }
  @media (max-width: 450px) {
    position: absolute;
    width: 80%;
    min-width: 300px;
    height: 80%;
    border-radius: 5%;
    background-color: #ff4b2b;
    border-radius: 10px;
    color: white;
    box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
    display: ${(props) => (props.isVisible ? "flex" : "none")};
  }
`;

// 정보 수정창
export const RightInfo = styled.div`
  @media (min-width: 451px) {
    display: flex;
    flex-direction: column;
    box-shadow: -5px -5px 1px #fff, 5px 5px 1px #babebc;
    border-radius: 10px;
    width: 80%;
    height: 80%;
    animation-name: Info-animation;
    animation-duration: 0.3s;
    color: white;
    border: 3px solid black;
    align-items: center;
  }
  @media (max-width: 450px) {
    box-shadow: -5px -5px 1px #fff, 5px 5px 1px #babebc;
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    animation-name: Info-animation;
    animation-duration: 0.3s;
  }
  @keyframes Info-animation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
// 정보 수정창 등장
export const InputTag = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
`;

// 꾸밈 효과
// 좌측 버튼
export const SetButton = styled.button`
  @media (min-width: 450px) {
    margin: 0;
    padding: 0;
    border: none;
    font-size: 1.8rem;
    border-radius: 10px;
    box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
    width: ${(props) => props.width || "70%"};
    height: ${(props) => props.height || "20%"};
    cursor: pointer;
    transition: transform 0.3s;
  }
  @media (max-width: 450px) {
    margin: 0;
    padding: 0;
    border: none;
    font-size: 1rem;
    width: 40%;
    height: 35%;
    border-radius: 10px;
    box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
    transition-duration: 0.3s;
  }
  &:active {
    box-shadow: inset 1px 1px 2px #babebc, inset -1px -1px 2px #fff;
  }
`;
// 닫기 버튼
export const CloseButton = styled.button`
  @media (min-width: 451px) {
    display: none;
  }
  @media (max-width: 450px) {
    margin: 0;
    padding: 0;
    border: none;
    font-size: 30px;
    border-radius: 10px;
    box-shadow: -5px -5px 2px #fff, 5px 5px 1px #babebc;
    transition-duration: 0.3s;
  }
  &:active {
    cursor: pointer;
    box-shadow: inset 1px 1px 2px #babebc, inset -1px -1px 2px #fff;
  }
`;
// 입력창
export const InputBox = styled.input`
  @media (min-width: 450px) {
    margin: 0;
    padding: 0;
    background-color: none;
    border: none;
    border-radius: 10px;
    text-align: center;
    width: 60%;
    height: 5%;
    font-size: 40px;
    box-shadow: 1px 1px 5px 1px black inset;
  }
  @media (max-width: 450px) {
    background-color: none;
    margin: 0;
    padding: 0;
    border: none;
    text-align: center;
    box-shadow: inset 7px 2px 5px #babebc, inset -5px -5px 6px #fff;
    border-radius: 10px;
    width: 80%;
    height: 5%;
    font-size: 30px;
  }
`;

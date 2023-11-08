import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* 여기에 글로벌 스타일을 정의합니다. */
  body {
    margin: 0;
    padding: 0;
  }
  /* 다른 글로벌 스타일 정의 가능 */
`;

// 기본 컨테이너: 전체 레이어
export const Container = styled.div`
  // PC
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  width: 80vw;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  background-color: #fff;
  min-width: 1300px;
  min-height: 800px;
  // 모바일
  @media (max-width: 450px) {
    box-sizing: border-box;
    width: 100vw;
    height: 150vh;
    display: flex;
    background-color: #fff;
  }
`;

//
// 좌측 레이어, 모바일은 전체
// 좌측(이미지 및 정보보여주기, 정보 출력)
export const Left = styled.div`
  display: flex;
  width: ${(props) => props.width || "30%"};
  height: 98%;
  border-radius: 10px;
  box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
  background: #ebecf0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 500px;

  @media (max-width: 450px) {
    width: 100%;
    height: 150%;
    display: flex;
  }
`;

//
// 이미지 변경 및 등록 레이어
export const Imagine = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
  border-radius: 5%;
  width: 80%;
  height: 30%;
  margin-bottom: 5%;
  overflow: hidden;
  @media (max-width: 450px) {
    width: 60%;
    height: 25%;
  }
`;
// 이미지 나누기 구역
export const ImageSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "80%"};
`;
// 이미지 내부 레이어
export const IsideImage = styled.img`
  border: 3px solid red;
  transition-delay: 0.3s;
  transition-duration: 0.3s;
  &:hover {
    // 우측 아래로 확대
  }
`;
// 이미지 등록
export const ImageSubmit = styled.input`
  border: 3px solid red;
  cursor: pointer;
  color: transparent;
  outline: none;
  width: ${(props) => props.width || "50%"};
  height: ${(props) => props.height || "80%"};
`;
// 이미지 업로드
export const ImageUpload = styled.button`
  cursor: pointer;
  border: 3px solid red;
  width: ${(props) => props.width || "50%"};
  height: ${(props) => props.height || "80%"};
  font-size: 1rem;
`;
//
// 정보 레이어
export const InfoBox = styled.div`
  width: 80%;
  height: 30%;
  display: flex;
  box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  min-height: 300px;
  @media (max-width: 450px) {
    width: 60%;
    height: 20%;
  }
`;
// 정보의 내용 레이어
export const InfoName = styled.div`
  box-shadow: 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
  width: 40%;
  height: 80%;
  font-size: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (max-width: 450px) {
    font-size: 1.5rem;
  }
`;
//

//
// 좌측 하단 버튼들의 레이어
export const LeftButton = styled.div`
  margin-top: 5%;
  width: 80%;
  height: 30%;
  display: flex;
  flex-direction: column;
  box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;

  @media (max-width: 450px) {
    width: 60%;
    height: 30%;
    display: flex;
    box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
    flex-wrap: wrap;
  }
`;
//
// 우측 레이어, 모바일시 어퍼 레이어
// 우측 실제로 정보를 변경하는 레이어
export const Right = styled.div`
  background-color: #3cb371;
  border-radius: 10px;
  color: black;
  box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
  width: 60%;
  height: 98%;
  display: flex;
  justify-content: center;
  text-align: center;
  min-width: 500px;
  @media (max-width: 450px) {
    margin-top: 50%;
    position: absolute;
    width: 200vw;
    height: 200%;
    border-radius: 5%;
    display: ${(props) => (props.isVisible ? "flex" : "none")};
    z-index: 50;
  }
`;
// 정보 수정창
export const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: -5px -5px 1px #fff, 5px 5px 1px #babebc;
  border-radius: 10px;
  color: black;
  align-items: center;
  animation-name: Info-animation;
  animation-duration: 0.3s;
  width: 100%;
  height: 100%;

  @media (max-width: 450px) {
    text-align: center;
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
  flex-direction: column;
  width: ${(props) => props.width || "50%"};
  height: ${(props) => props.height || "80%"};
  border-radius: 10px;
  border: 3px solid white;
  align-items: center;
  justify-content: center;
  .InpuTitle {
    display: flex;
    width: 60%;
    flex-direction: row;
    border: 3px solid red;
    justify-content: space-around;

    .littleTitle {
      font-size: 1rem;
      font-weight: bold;
    }
  }
  @media (max-width: 450px) {
    width: 80%;
    height: 80%;
  }
`;
// 입력창
export const InputBox = styled.input`
  margin: 0;
  padding: 0;
  background-color: none;
  border: none;
  text-align: center;
  border-radius: 10px;
  width: ${(props) => props.width || "60%"};
  height: ${(props) => props.height || "5%"};
  font-size: 2rem;
  box-shadow: 1px 1px 5px 1px black inset;

  @media (max-width: 450px) {
    background-color: none;
    box-shadow: inset 7px 2px 5px #babebc, inset -5px -5px 6px #fff;
    width: 80%;
    height: ${(props) => props.height || "100%"};
    font-size: 2rem;
  }
`;

//
export const DivRow = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  border: 3px solid black;
  width: 80%;
  height: 5%;

  .chooseBank {
    width: 20%;
    border: none;
    border-radius: 10px;
  }
`;

export const SetButton = styled.button`
  display: none;
  @media (max-width: 450px) {
    width: 20%;
    height: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0;
    border: 2px solid #888888;
    outline: none;
    background-color: #f4f5f6;
    border-radius: 15px;

    transition: 0.13s ease-in-out;
    cursor: pointer;
  }
`;

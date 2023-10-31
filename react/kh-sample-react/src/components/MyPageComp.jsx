import styled from "styled-components";

// 꾸밈 효과
// 좌측 버튼
export const ResetButton = styled.button`
  @media (min-width: 450px) {
    margin: 0;
    padding: 0;
    border: none;
    font-size: 2rem;
    border-radius: 10px;
    box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
    width: 70%;
    height: 20%;
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
  @media (min-width: 450px) {
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
    width: 80%;
    height: 8%;
    font-size: 40px;
    box-shadow: 1px 1px 5px 1px black inset;
  }
  @media (max-width: 450px) {
    background-color: none;
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: inset 7px 2px 5px #babebc, inset -5px -5px 6px #fff;
    border-radius: 10px;
    width: 80%;
    height: 10%;
    font-size: 30px;
  }
`;

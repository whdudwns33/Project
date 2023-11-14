import React, { useState } from "react";
import styled from "styled-components";

const QnAContainer = styled.div`
  background-color: var(--black);
  padding: 20px;
  margin: auto;
  width: 100%;
  border-radius: 0;
  font-size: 20pt;
`;

const Header = styled.h2`
  color: var(--white);
  text-align: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--black);
  color: var(--gray);
  margin-left: 30%;
  margin-right: 30%;
  padding: 10px 20px;
  cursor: pointer;
  border: 2px solid var(--black);
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--gray);
    color: var(--black);
  }
`;

const Arrow = styled.span`
  color: var(--white);
`;

const Answer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--black); // 질문 상자와 동일한 배경색
  color: var(--gray); // 질문 상자와 동일한 글자색
  margin-left: 30%;
  margin-right: 30%;
  padding: ${({ $isOpen }) => ($isOpen ? "10px 20px" : "10px 20px")};
  cursor: pointer;
  border: 2px solid var(--black); // 질문 상자와 동일한 테두리
  border-radius: 5px; // 질문 상자와 동일한 테두리 둥글기
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--gray); // 질문 상자와 동일한 호버 효과
    color: var(--black);
  }

  // 확장될 때의 스타일 변화
  max-height: ${({ $isOpen }) => ($isOpen ? "300px" : "0")};
  overflow: hidden;
  transition: max-height 0.5s ease, padding 0.5s ease, border-color 0.5s ease;
`;

const AnswerContent = styled.div`
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.5s ease, visibility 0.5s ease;
`;

const QuestionAnswer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      Q: "안쓰면 정말 환불해 주나요?",
      A: "물론입니다. 결제 후 콘텐츠 다운로드 및 열람을 하지 않으셨다면 전액 환불해 드리고 있어요.",
    },
    {
      Q: "어떤 파일 형식들을 지원하나요?",
      A: "epub, pdf, txt 형식의 뷰어들을 지원하고 있습니다.",
    },
    {
      Q: "무료 혜택은 누구나 받을 수 있나요?",
      A: "네, 회원이라면 누구나 첫 정기구독 신청 시 1회 첫 달 무료 혜택이 제공됩니다.",
    },
    {
      Q: "어떤 기기에서 사용할 수 있나요?",
      A: "스마트폰 / 태블릿 : iOS13, Android 6 이상 지원\nPC : MAC Yosemite, Window 10 이상 지원\nE-ink : Android 4.4 이상 지원합니다.",
    },
  ];

  return (
    <QnAContainer>
      <Header>자주 묻는 질문</Header>
      {questions.map((item, index) => (
        <div key={index}>
          <Question
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {item.Q}
            <Arrow>{openIndex === index ? "▲" : "▼"}</Arrow>
          </Question>
          <Answer $isOpen={openIndex === index}>
            <AnswerContent $isOpen={openIndex === index}>
              {item.A}
            </AnswerContent>
          </Answer>
        </div>
      ))}
    </QnAContainer>
  );
};

export default QuestionAnswer;

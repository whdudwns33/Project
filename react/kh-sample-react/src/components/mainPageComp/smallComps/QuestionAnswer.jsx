import React, { useState } from 'react';
import styled from 'styled-components';

const QnAContainer = styled.div`
  background-color: grey;
  padding: 20px;
  width: 80%;
  margin: auto;
  font-family: Arial, sans-serif;
  border-radius: 10px;
`;

const Header = styled.h1`
  color: whitesmoke;
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: grey;
  color: whitesmoke;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: grey;
  }
`;

const Answer = styled.div`
  background-color: grey;
  color: whitesmoke;
  border: 2px solid ${({ $isOpen }) => ($isOpen ? 'black' : 'transparent')};
  padding: ${({ $isOpen }) => ($isOpen ? '10px 20px' : '0 20px')};
  margin-top: 10px;
  max-height: ${({ $isOpen }) => ($isOpen ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease, padding 0.5s ease, border-color 0.5s ease;
  border-radius: 5px;
`;

const AnswerContent = styled.div`
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.5s ease, visibility 0.5s ease;
`;




const QuestionAnswer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      Q: '안쓰면 정말 환불해 주나요?',
      A: '물론입니다. 결제 후 콘텐츠 다운로드 및 열람을 하지 않으셨다면 전액 환불해 드리고 있어요.'
    },
    {
      Q: '구독을 해지할 수 있나요? 수수료는 없나요?',
      A: '다음달 부터 결제되지 않도록 수수료 없이 언제든지 해지하실 수 있습니다.'
    },
    {
      Q: '무료 혜택은 누구나 받을 수 있나요?',
      A: '네, 회원이라면 누구나 첫 정기구독 신청 시 1회 첫 달 무료 혜택이 제공됩니다.'
    },
    {
      Q: '어떤 기기에서 사용할 수 있나요?',
      A: '스마트폰 / 태블릿 : iOS13, Android 6 이상 지원\nPC : MAC Yosemite, Window 10 이상 지원\nE-ink : Android 4.4 이상 지원합니다.'
    }
  ];

  return (
    <QnAContainer>
      <Header>자주 묻는 질문</Header>
      {questions.map((item, index) => (
        <div key={index}>
          <Question onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            {item.Q}
            <span>{openIndex === index ? '▲' : '▼'}</span>
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

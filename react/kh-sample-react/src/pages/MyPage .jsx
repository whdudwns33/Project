import { useState } from "react";
import {
  Container,
  SetButton,
  Left,
  LeftTop,
  Imagine,
  InfoBox,
  InfoName,
  LeftBottom,
  LeftButton,
  Right,
  CloseButton,
  RightInfo,
} from "../components/MyPageComp";
import MyPageID from "../components/MyPageID";
import MyPagePW from "../components/MyPagePW";
import MyPageDELETE from "../components/MyPageDelete";

// 입력받은 정보를 객체로 저장하는 함수 reducer
export const reducer = (data, action) => {
  switch (action.type) {
    case "Name":
      return { ...data, name: action.value }; // 저장하려는 정보를 해당 key에 맞게 업데이트
    case "Id":
      return { ...data, id: action.value };
    case "Pw":
      return { ...data, pw: action.value };
    case "Email":
      return { ...data, email: action.value };
    default:
      return data;
  }
};
const MyPage = () => {
  // 초기 상태 설정
  const [rightIdInfo, setRightIdInfo] = useState(false);
  const [rightPwInfo, setRightPwInfo] = useState(false);
  const [rightCash, setRightCash] = useState(false);
  const [rightMember, setRightMember] = useState(false);

  const [isRightVisible, setIsRightVisible] = useState(false);
  const onClckCloseRight = () => {
    setIsRightVisible(!isRightVisible);
  };

  const [msgName, setNameMsg] = useState("이름 형식에 맞추어 입력하시오.");
  const [msgId, setIdMsg] = useState("아이디 형식에 맞추어 입력하시오.");
  const [msgPw, setPwMsg] = useState("비밀번호 형식에 맞추어 입력하시오.");
  const [msgEmail, setEmailMsg] = useState("이메일 형식에 맞추어 입력하시오.");

  const handleButtonClick = (isId, isPw, isCash, isMember) => {
    setIsRightVisible(true);
    setRightIdInfo(isId);
    setRightPwInfo(isPw);
    setRightCash(isCash);
    setRightMember(isMember);
    setNameMsg("이름 형식에 맞추어 입력하시오.");
    setIdMsg("아이디 형식에 맞추어 입력하시오.");
    setPwMsg("비밀번호 형식에 맞추어 입력하시오.");
    setEmailMsg("이메일 형식에 맞추어 입력하시오.");
  };

  // ID 변경 버튼 클릭
  const onClickId = () => {
    handleButtonClick(true, false, false, false);
  };

  // Pw 변경 버튼 클릭
  const onClickPw = () => {
    handleButtonClick(false, true, false, false);
  };

  // Cash 충전 버튼 클릭
  const onClickCash = () => {
    handleButtonClick(false, false, true, false);
  };

  // 회원 탈퇴 버튼 클릭
  const onClickMember = () => {
    handleButtonClick(false, false, false, true);
  };

  return (
    <Container>
      <Left>
        <LeftTop>
          <Imagine>
            <img src="/태연.jpg" alt="사진" />
          </Imagine>
          <InfoBox>
            <div>
              <InfoName>회원 이름</InfoName>
              <InfoName>이메일</InfoName>
              <InfoName>전화번호</InfoName>
              <InfoName>소지금액</InfoName>
            </div>
            <div>
              <p style={{ marginTop: "0" }}>결과 출력</p>
            </div>
          </InfoBox>
        </LeftTop>
        <LeftBottom>
          <LeftButton>
            <SetButton onClick={onClickId}>아이디 변경</SetButton>
            <SetButton onClick={onClickPw}>비밀번호 변경</SetButton>
            <SetButton onClick={onClickCash}>금액충전</SetButton>
            <SetButton onClick={onClickMember}>회원탈퇴</SetButton>
          </LeftButton>
        </LeftBottom>
      </Left>

      <Right isVisible={isRightVisible}>
        {/* 아이디 변경 */}
        {rightIdInfo && (
          <RightInfo>
            <MyPageID />
            <CloseButton onClick={onClckCloseRight}>닫기버튼</CloseButton>
          </RightInfo>
        )}
        {/* 패스워드 변경 */}
        {rightPwInfo && (
          <RightInfo>
            <MyPagePW />
            <CloseButton onClick={onClckCloseRight}>닫기버튼</CloseButton>
          </RightInfo>
        )}
        {/*         
        {rightCash && (
          <RightInfo>
            <h1>금액 충전</h1>
            <CloseButton onClick={onClckCloseRight}>닫기버튼</CloseButton>
          </RightInfo>
        )} */}

        {rightMember && (
          <RightInfo>
            <MyPageDELETE />
            <CloseButton onClick={onClckCloseRight}>닫기버튼</CloseButton>
          </RightInfo>
        )}
      </Right>
    </Container>
  );
};

export default MyPage;

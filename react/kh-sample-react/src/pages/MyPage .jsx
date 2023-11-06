import { useState, useEffect } from "react";
import {
  Container,
  Left,
  Imagine,
  InfoBox,
  InfoName,
  LeftButton,
  Right,
  CloseButton,
  RightInfo,
} from "../components/MyPageComp";
import { StyledButton } from "../globalStyle/StyledButton";
import MyPageID from "../components/MyPageID";
import MyPagePW from "../components/MyPagePW";
import MyPageDELETE from "../components/MyPageDelete";
import MyPageCash from "../components/MyPageCash";
import AxiosApi from "../api/MyPageAxiosApi";
import MyPageSlider from "../components/MyPageSilder";

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
  // 임시 id 키
  const id = "jojo6807";
  // 초기 상태 설정
  const [rightIdInfo, setRightIdInfo] = useState(false);
  const [rightPwInfo, setRightPwInfo] = useState(false);
  const [rightCash, setRightCash] = useState(false);
  const [rightMember, setRightMember] = useState(false);
  const [rightSlider, setRightSlider] = useState(true);

  const [isRightVisible, setIsRightVisible] = useState(false);
  const onClckCloseRight = () => {
    setIsRightVisible(!isRightVisible);
  };

  const [msgName, setNameMsg] = useState("이름 형식에 맞추어 입력하시오.");
  const [msgId, setIdMsg] = useState("아이디 형식에 맞추어 입력하시오.");
  const [msgPw, setPwMsg] = useState("비밀번호 형식에 맞추어 입력하시오.");
  const [msgEmail, setEmailMsg] = useState("이메일 형식에 맞추어 입력하시오.");

  const handleButtonClick = (isId, isPw, isCash, isMember, isSlider) => {
    setIsRightVisible(true);
    setRightIdInfo(isId);
    setRightPwInfo(isPw);
    setRightCash(isCash);
    setRightMember(isMember);
    setRightSlider(isSlider);
    setNameMsg("이름 형식에 맞추어 입력하시오.");
    setIdMsg("아이디 형식에 맞추어 입력하시오.");
    setPwMsg("비밀번호 형식에 맞추어 입력하시오.");
    setEmailMsg("이메일 형식에 맞추어 입력하시오.");
  };
  // 회원정보 조회
  const [memberInfo, setMemberInfo] = useState({});
  useEffect(() => {
    const memberInfo = async () => {
      const rsp = await AxiosApi.memberGet(id); // 전체 조회
      if (rsp.status === 200) {
        // 콘솔창 보면 DATA[0]이 리스트
        setMemberInfo(rsp.data[0]);
        console.log(rsp.data[0]);
      }
    };
    memberInfo();
  }, []);

  // ID 변경 버튼 클릭
  const onClickId = () => {
    handleButtonClick(true, false, false, false, false);
  };

  // Pw 변경 버튼 클릭
  const onClickPw = () => {
    handleButtonClick(false, true, false, false, false);
  };

  // Cash 충전 버튼 클릭
  const onClickCash = () => {
    handleButtonClick(false, false, true, false, false);
  };

  // 회원 탈퇴 버튼 클릭
  const onClickMember = () => {
    handleButtonClick(false, false, false, true, false);
  };

  return (
    <Container>
      <Left>
        <Imagine>
          <img src="/태연.jpg" alt="사진" />
        </Imagine>
        <InfoBox>
          <div>
            <InfoName>회원 이름: {memberInfo.name}</InfoName>
            <InfoName>이메일: {memberInfo.email}</InfoName>
            <InfoName>전화번호: {memberInfo.tel}</InfoName>
            <InfoName>소지금액: {memberInfo.cash}원</InfoName>
          </div>
        </InfoBox>
        <LeftButton>
          <StyledButton
            value="아이디 변경"
            width="60%"
            height="15%"
            onClick={onClickId}
          ></StyledButton>
          <StyledButton
            value="비밀번호 변경"
            width="60%"
            height="15%"
            onClick={onClickPw}
          ></StyledButton>
          <StyledButton
            value="금액 충전"
            width="60%"
            height="15%"
            onClick={onClickCash}
          ></StyledButton>
          <StyledButton
            value="회원 탈퇴"
            width="60%"
            height="15%"
            onClick={onClickMember}
          ></StyledButton>
        </LeftButton>
      </Left>

      <Right isVisible={isRightVisible}>
        {rightSlider && <MyPageSlider />}
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

        {rightCash && (
          <RightInfo>
            <MyPageCash />
            <CloseButton onClick={onClckCloseRight}>닫기버튼</CloseButton>
          </RightInfo>
        )}

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

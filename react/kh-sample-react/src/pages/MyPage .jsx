import { useState, useEffect } from "react";
import {
  Container,
  Left,
  Imagine,
  InfoBox,
  InfoName,
  LeftButton,
  Right,
  RightInfo,
  SetButton,
} from "../components/MyPageComp";
import { StyledButton } from "../globalStyle/StyledButton";
import MyPageID from "../components/MyPageID";
import MyPagePW from "../components/MyPagePW";
import MyPageDELETE from "../components/MyPageDelete";
import MyPageCash from "../components/MyPageCash";
import AxiosApi from "../api/MyPageAxiosApi";
import MyPageSlider from "../components/MyPageSilder";
import ProfileImage from "../components/MyPageProfile";

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
          <ProfileImage />
        </Imagine>
        <InfoBox>
          <>
            <InfoName>
              <p>회원 이름</p>
              <p>이메일</p>
              <p>전화 번호</p>
              <p>소지 금액</p>
            </InfoName>
            <InfoName>
              <p style={{ fontSize: "100%" }}>{memberInfo.name}</p>
              <p style={{ fontSize: "100%" }}>{memberInfo.email}</p>
              <p style={{ fontSize: "100%" }}>{memberInfo.tel}</p>
              <p style={{ fontSize: "100%" }}>{memberInfo.cash}원</p>
            </InfoName>
          </>
        </InfoBox>
        <LeftButton>
          <StyledButton
            value="아이디 변경"
            width="80%"
            height="20%"
            onClick={onClickId}
          ></StyledButton>
          <StyledButton
            value="비밀번호 변경"
            width="80%"
            height="20%"
            onClick={onClickPw}
          ></StyledButton>
          <StyledButton
            value="금액 충전"
            width="80%"
            height="20%"
            onClick={onClickCash}
          ></StyledButton>
          <StyledButton
            value="회원 탈퇴"
            width="80%"
            height="20%"
            onClick={onClickMember}
          ></StyledButton>
        </LeftButton>
      </Left>

      <Right isVisible={isRightVisible}>
        {/* 아이디 변경 */}
        {rightIdInfo && (
          <RightInfo>
            <MyPageID />
            <SetButton onClick={onClckCloseRight}>닫기버튼</SetButton>
          </RightInfo>
        )}
        {/* 패스워드 변경 */}
        {rightPwInfo && (
          <RightInfo>
            <MyPagePW />
            <SetButton onClick={onClckCloseRight}>닫기버튼</SetButton>
          </RightInfo>
        )}

        {rightCash && (
          <RightInfo>
            <MyPageCash />
            <SetButton onClick={onClckCloseRight}>닫기버튼</SetButton>
          </RightInfo>
        )}

        {rightMember && (
          <RightInfo>
            <MyPageDELETE />
            <SetButton onClick={onClckCloseRight}>닫기버튼</SetButton>
          </RightInfo>
        )}
      </Right>
    </Container>
  );
};

export default MyPage;

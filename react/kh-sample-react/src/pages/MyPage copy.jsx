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
import MyPageName from "../components/MyPageName";
import AxiosApi from "../api/MyPageAxiosApi";
import ProfileImage from "../components/MyPageProfile";
import { useUser } from "../contexts/Context";
import Footer from "../components/mainPageComp/Footer";
import { StyledTop } from "../globalStyle/StyledTop";
// 입력받은 정보를 객체로 저장하는 함수 reducer

export const reducer = (data, action) => {
  switch (action.type) {
    case "Name":
      return { ...data, name: action.value };
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
  // 로그인 정보를 받아오는 context
  const { checkLoginStatus, isLoggedin, user } = useUser();

  // 회원정보 조회
  const [memberInfomation, setMemberInfo] = useState("");

  useEffect(() => {
    checkLoginStatus();
    console.log("로그인 상태입니다.");
  }, []);

  useEffect(() => {
    const memberInfo = async () => {
      if (isLoggedin && user) {
        const rsp = await AxiosApi.memberGet(user.id);
        if (rsp.status === 200) {
          console.log(user);
          console.log(user.id);
          setMemberInfo(rsp.data[0]);
          console.log(memberInfomation);
        }
      }
    };
    if (user && user.id) {
      memberInfo();
    }
  }, [user]); // 의존성 배열에 user 추가

  // 초기 상태 설정
  const [rightIdInfo, setRightIdInfo] = useState(false);
  const [rightPwInfo, setRightPwInfo] = useState(false);
  const [rightCash, setRightCash] = useState(false);
  const [rightMember, setRightMember] = useState(false);
  const [rightName, setRightName] = useState(true);

  const [isRightVisible, setIsRightVisible] = useState(false);
  const onClckCloseRight = () => {
    setIsRightVisible(!isRightVisible);
  };

  const [msgName, setNameMsg] = useState("이름 형식에 맞추어 입력하시오.");
  const [msgId, setIdMsg] = useState("아이디 형식에 맞추어 입력하시오.");
  const [msgPw, setPwMsg] = useState("비밀번호 형식에 맞추어 입력하시오.");
  const [msgEmail, setEmailMsg] = useState("이메일 형식에 맞추어 입력하시오.");

  const handleButtonClick = (isId, isPw, isCash, isMember, isName) => {
    setIsRightVisible(true);
    setRightIdInfo(isId);
    setRightPwInfo(isPw);
    setRightCash(isCash);
    setRightMember(isMember);
    setRightName(isName);
    setNameMsg("이름 형식에 맞추어 입력하시오.");
    setIdMsg("아이디 형식에 맞추어 입력하시오.");
    setPwMsg("비밀번호 형식에 맞추어 입력하시오.");
    setEmailMsg("이메일 형식에 맞추어 입력하시오.");
  };

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

  // 회원 탈퇴 버튼 클릭
  const onClickName = () => {
    handleButtonClick(false, false, false, false, true);
  };

  useEffect(() => {
    const delayedInfoName = () => {
      setTimeout(() => {
        // InfoName 컴포넌트 렌더링 시 딜레이를 주고 싶은 작업들을 여기에 추가
      }, 4000); // 4000 milliseconds 딜레이
    };
    delayedInfoName();
  }, [memberInfomation]);

  return (
    <>
      <StyledTop></StyledTop>
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
                <p style={{ fontSize: "100%" }}>{memberInfomation.name}</p>
                <p style={{ fontSize: "100%" }}>{memberInfomation.email}</p>
                <p style={{ fontSize: "100%" }}>{memberInfomation.tel}</p>
                <p style={{ fontSize: "100%" }}>{memberInfomation.cash}원</p>
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
            <StyledButton
              value="이름 변경"
              width="80%"
              height="20%"
              onClick={onClickName}
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
          {rightName && (
            <RightInfo>
              <MyPageName />
              <SetButton onClick={onClckCloseRight}>닫기버튼</SetButton>
            </RightInfo>
          )}
        </Right>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default MyPage;

import { useState, useEffect } from "react";
import {
  Container,
  Left,
  Imagine,
  InfoBox,
  RightButton,
  Right,
  RightInfo,
  SetButton,
  DivRowt,
  LeftDiv,
  Information,
  Body,
  Img,
  DivRow,
  CloseButton,
} from "../components/MyPageComp";
import MyPageID from "../components/MyPageID";
import MyPagePW from "../components/MyPagePW";
import MyPageDELETE from "../components/MyPageDelete";
import MyPageCash from "../components/MyPageCash";
import MyPageName from "../components/MyPageName";
import ProfileImage from "../components/MyPageProfile";
import { useUser } from "../contexts/Context";
import Footer from "../components/mainPageComp/Footer";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/LoginModal";
import MyPageAxiosApi from "../api/MyPageAxiosApi";

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
  const navigate = useNavigate();
  // 로그인 정보를 받아오는 context
  const { checkLoginStatus, isLoggedin, user, token } = useUser();
  // 회원정보 조회
  const [memberInformation, setMemberInfo] = useState("");
  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
    navigate("/");
  };
  useEffect(() => {
    checkLoginStatus(() => {
      if (!token) {
        setModal(true);
      }
    });
  }, [token]);

  useEffect(() => {
    const memberInfo = async () => {
      if (isLoggedin && user) {
        const rsp = await MyPageAxiosApi.memberGet(user.id);
        if (rsp.status === 200) {
          console.log(rsp.data[0].profileUrl);
          console.log(user.id);
          setMemberInfo(rsp.data[0]);
          console.log("회원 정보 2" + memberInformation.profileUrl);
        }
      }
    };
    if (user && user.id) {
      memberInfo();
    }
  }, [user, token]); // 의존성 배열에 user 추가

  // 초기 상태 설정
  const [rightIdInfo, setRightIdInfo] = useState(true);
  const [rightPwInfo, setRightPwInfo] = useState(false);
  const [rightCash, setRightCash] = useState(false);
  const [rightMember, setRightMember] = useState(false);
  const [rightName, setRightName] = useState(false);

  const [isRightVisible, setIsRightVisible] = useState(false);
  const onClckCloseRight = () => {
    setIsRightVisible(!isRightVisible);
  };

  const handleButtonClick = (isId, isPw, isCash, isMember, isName) => {
    setIsRightVisible(true);
    setRightIdInfo(isId);
    setRightPwInfo(isPw);
    setRightCash(isCash);
    setRightMember(isMember);
    setRightName(isName);
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

  return (
    <Body>
      <Modal open={modal} close={closeModal}>
        로그인 상태가 아닙니다!
      </Modal>
      <Container>
        <Left>
          {/* {memberInformation.profileUrl} */}
          <Imagine>
            <Img src={memberInformation.profileUrl} alt="이미지 사진" />
            <ProfileImage />
          </Imagine>
          <InfoBox>
            <DivRow>
              <p>NAME.</p> <p>{memberInformation.name}</p>
            </DivRow>
            <DivRowt>
              <Information>EMAIL.</Information>{" "}
              <Information>{memberInformation.email}</Information>
            </DivRowt>
            <DivRowt>
              <Information>TEL.</Information>{" "}
              <Information>{memberInformation.tel}</Information>
            </DivRowt>
            <DivRow>
              <p>CASH.</p>
              <p>{memberInformation.cash}</p>
            </DivRow>
          </InfoBox>
          <LeftDiv>
            <SetButton onClick={onClickName}>이름 변경</SetButton>
            <SetButton onClick={onClickId}>아이디 변경</SetButton>
            <SetButton onClick={onClickPw}>비밀번호 변경</SetButton>
            <SetButton onClick={onClickCash}>현금 충전</SetButton>
            <SetButton onClick={onClickMember}>회원 탈퇴</SetButton>
          </LeftDiv>
        </Left>

        <Right isVisible={isRightVisible}>
          {/* 아이디 변경 */}
          {rightIdInfo && (
            <RightInfo>
              <MyPageID />
              <CloseButton onClick={onClckCloseRight}>X</CloseButton>
            </RightInfo>
          )}
          {/* 패스워드 변경 */}
          {rightPwInfo && (
            <RightInfo>
              <MyPagePW />
              <CloseButton
                width="20%"
                height="20%"
                value="X"
                onClick={onClckCloseRight}
              >
                X
              </CloseButton>
            </RightInfo>
          )}

          {rightCash && (
            <RightInfo>
              <MyPageCash />
              <CloseButton
                width="20%"
                height="20%"
                value="X"
                onClick={onClckCloseRight}
              >
                X
              </CloseButton>
            </RightInfo>
          )}

          {rightMember && (
            <RightInfo>
              <MyPageDELETE />
              <CloseButton
                width="20%"
                height="20%"
                value="X"
                onClick={onClckCloseRight}
              >
                X
              </CloseButton>
            </RightInfo>
          )}
          {rightName && (
            <RightInfo>
              <CloseButton
                width="20%"
                height="20%"
                value="X"
                onClick={onClckCloseRight}
              >
                X
              </CloseButton>
              <MyPageName />
            </RightInfo>
          )}
          <RightButton>
            <SetButton onClick={onClickName}>이름 변경</SetButton>
            <SetButton onClick={onClickId}>아이디 변경</SetButton>
            <SetButton onClick={onClickPw}>비밀번호 변경</SetButton>
            <SetButton onClick={onClickCash}>금액 충전</SetButton>
            <SetButton onClick={onClickMember}>회원 탈퇴</SetButton>
          </RightButton>
        </Right>
      </Container>
      <Footer></Footer>
    </Body>
  );
};

export default MyPage;

import { useState, useEffect } from "react";
import {
  Container,
  Left,
  Imagine,
  InfoBox,
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
import { useNavigate } from "react-router-dom";
import { StyledTop } from "../globalStyle/StyledTop";
import Modal from "../utils/LoginModal";

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
  const { checkLoginStatus, isLoggedin, user } = useUser();
  // 회원정보 조회
  const [memberInformation, setMemberInfo] = useState("");
  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
    navigate("/");
  }

  useEffect(() => {
    checkLoginStatus();
    if (isLoggedin !== true) {
      setModal(true);
    }
  }, [isLoggedin]);

  useEffect(() => {
    const memberInfo = async () => {
      if (isLoggedin && user) {
        const rsp = await AxiosApi.memberGet(user.id);
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
  }, [user, isLoggedin]); // 의존성 배열에 user 추가

  // 초기 상태 설정
  const [rightIdInfo, setRightIdInfo] = useState(false);
  const [rightPwInfo, setRightPwInfo] = useState(false);
  const [rightCash, setRightCash] = useState(false);
  const [rightMember, setRightMember] = useState(false);
  const [rightName, setRightName] = useState(false);

  const [isRightVisible, setIsRightVisible] = useState(false);
  const onClckCloseRight = () => {
    setIsRightVisible(!isRightVisible);
  };

 ;

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
    <>
    <Modal open={modal} close={closeModal}>로그인 상태가 아닙니다! </Modal>
    <StyledTop></StyledTop>
      <Container>
        <Left>
        {memberInformation.profileUrl}
          <Imagine src = {memberInformation.profileUrl}>

            <ProfileImage />
          </Imagine>
         
          <LeftButton>
          <StyledButton
              value="이름 변경"
              width="80%"
              height="20%"
              onClick={onClickName}
            ></StyledButton>
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

        <Right isvisible={isRightVisible}>
        <InfoBox>
           
            
           <table>
             <thead>
               <tr>
                 <th>NAME.</th>
                 <th>EMAIL.</th>
                 <th>TEL.</th>
                 <th>CASH.</th>
               </tr>
             </thead>
             <tbody>
               <td>{memberInformation.name}</td>
               <td>{memberInformation.email}</td>
               <td>{memberInformation.tel}</td>
               <td>{memberInformation.cash}</td>
               </tbody>
           </table>
                 </InfoBox>
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

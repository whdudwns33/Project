import { useState, useReducer, useEffect } from "react";
import {
  Container,
  SetButton,
  CloseButton,
  InputBox,
  Left,
  LeftTop,
  Imagine,
  InfoBox,
  InfoName,
  LeftBottom,
  LeftButton,
  Right,
  RightInfo,
  InputTag,
} from "../components/MyPageComp";
import AxiosApi from "../api/MyPageAxiosApi";
import MyPageID from "../components/MyPageID";


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
  // ㄱ. 버튼 클릭으로 화면 변화
  // 초기 상태 설정
  const [rightIdInfo, setRightIdInfo] = useState(false);
  const [rightPwInfo, setRightPwInfo] = useState(false);
  const [rightCash, setRightCash] = useState(false);
  const [rightMember, setRightMember] = useState(false);

  // 버튼 클릭으로 화면 변화 함수
  // 초기화 함수
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
  // ㄴ. 모바일 뷰어창 닫기
  const [isRightVisible, setIsRightVisible] = useState(false);
  const onClckCloseRight = () => {
    setIsRightVisible(!isRightVisible);
  };

  // // ㄷ. 정보 입력. useReducer 사용해보기, reducer 함수를 만들어서 배열로 데이터 관리
  // const [data, dispatch] = useReducer(reducer, {
  //   name: "",
  //   id: "",
  //   pw: "",
  //   email: "",
  // });
  // // ㄹ. 제약 조건
  const [msgName, setNameMsg] = useState("이름 형식에 맞추어 입력하시오.");
  const [msgId, setIdMsg] = useState("아이디 형식에 맞추어 입력하시오.");
  const [msgPw, setPwMsg] = useState("비밀번호 형식에 맞추어 입력하시오.");
  const [msgEmail, setEmailMsg] = useState("이메일 형식에 맞추어 입력하시오.");
  // 이름 제약 조건
  // const onChangeName = (e) => {
  //   const inputName = e.target.value;
  //   if (inputName.length >= 2 && !/[0-9!@#$%^&*(),.?":{}|<>]/.test(inputName)) {
  //     dispatch({ type: "Name", value: inputName });
  //     setNameMsg("유효합니다.");
  //     setCheckName(true);
  //   } else {
  //     dispatch({ type: "Name", value: false });
  //     setNameMsg("유효하지 않습니다.");
  //     setCheckName(false);
  //   }
  // };
  // // 아이디 제약 조건
  // const onChangeId = (e) => {
  //   const inputId = e.target.value;
  //   if (/^[a-zA-Z0-9]{8,20}$/.test(inputId)) {
  //     dispatch({ type: "Id", value: inputId });
  //     setIdMsg("유효합니다.");
  //     setCheckId(true);
  //   } else {
  //     dispatch({ type: "Id", value: false });
  //     setIdMsg("유효하지 않습니다.");
  //     setCheckId(false);
  //   }
  // };
  // // 비밀번호 제약 조건
  // const onChangePw = (e) => {
  //   const inputPw = e.target.value;
  //   if (
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
  //       inputPw
  //     )
  //   ) {
  //     dispatch({ type: "Pw", value: inputPw });
  //     setPwMsg("유효합니다.");
  //     setCheckPw(true);
  //   } else {
  //     dispatch({ type: "Pw", value: false });
  //     setPwMsg("유효하지 않습니다.");
  //     setCheckPw(false);
  //   }
  // };
  // // 이메일 제약 조건
  // const onChangeEmail = (e) => {
  //   const inputEmail = e.target.value;
  //   if (/^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/.test(inputEmail)) {
  //     dispatch({ type: "Email", value: inputEmail });
  //     setEmailMsg("유효합니다.");
  //     setCheckEmail(true);
  //   } else {
  //     dispatch({ type: "Email", value: false });
  //     setEmailMsg("유효하지 않습니다.");
  //     setCheckEmail(false);
  //   }
  // };

  // // 기본 이름 아이디 등 입력하고 난후 입력 조건이 적절하면 등장하는 정보 수정 입력창
  // // 체크
  // const [checkName, setCheckName] = useState(false);
  // const [checkId, setCheckId] = useState(false);
  // const [checkPw, setCheckPw] = useState(false);
  // const [checkEmail, setCheckEmail] = useState(false);

  // // 백엔드 이후 체크된 정보를 토대로 true or false
  // const [checkedInfo, setCheckedInfo] = useState(false);
  // const onClickCheck = async () => {
  //   const checked = await AxiosApi.memberCheck(
  //     data.name,
  //     data.id,
  //     data.pw,
  //     data.email
  //   );
  //   console.log(checked);
  //   console.log("온 클릭 체크 이후 결과가 잘 찍혔습니다.");
  //   console.log(data.name, data.id, data.pw, data.email);
  //   if (checked.data === true) {
  //     console.log("체크가 true입니다.");
  //     setCheckedInfo(true);
  //   } else {
  //     console.log("체크가 false입니다.");
  //     setCheckedInfo(false);
  //   }
  // };

  // // 변경 아이디 제약 조건
  // const [newId, setNewId] = useState("");
  // const [msg, setMsg] = useState("");
  // const onModifyId = (e) => {
  //   setMsg("");
  //   if (/^[a-zA-Z0-9]{8,20}$/.test(e.target.value)) {
  //     setMsg("유효합니다.");
  //     setNewId(e.target.value);

  //     setCheckTrue(true);
  //   } else {
  //     setMsg("유효하지 않습니다.");
  //     setCheckTrue(false);
  //   }
  // };

  // // 체크된 아이디 제출 및 클릭시 데이터 변경
  // const [checkTrue, setCheckTrue] = useState(false);
  // const onClickModifyId = async () => {
  //   try {
  //     const chId = await AxiosApi.modifyID(data.id, newId);
  //     console.log("newId의 값:", newId); // newId의 값을 확인
  //     console.log("제출된 아이디가 잘 찍혔습니다." + chId.data);
  //     if (chId === true) {
  //       setCheckTrue(true);
  //     } else {
  //       setCheckTrue(false);
  //     }
  //   } catch (error) {
  //     console.error("ID 변경 중 오류 발생:", error);
  //   }
  // };

  // const [PW, setPW] = useState("");
  // const onPw = (e) => {
  //   setMsg("");
  //   const Pw = e.target.value;
  //   if (
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
  //       Pw
  //     )
  //   ) {
  //     setMsg("유효합니다.");
  //     setPW(Pw);
  //   } else {
  //     setMsg("유효하지 않습니다.");
  //   }
  // };

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
        {rightIdInfo && (
          <MyPageID/>
        )}

        {/* {rightPwInfo && (
          <RightInfo>
            <h1>비밀번호 변경</h1>
            <InputBox placeholder="이름" type="text" onChange={onChangeName} />
            <p>{msgName}</p>
            <InputBox placeholder="ID" type="text" onChange={onChangeId} />
            <p>{msgId}</p>
            <InputBox placeholder="PW" type="text" onChange={onChangePw} />
            <p>{msgPw}</p>
            <InputBox
              placeholder="EMAIL"
              type="text"
              onChange={onChangeEmail}
            />
            <p>{msgEmail}</p>

            <CloseButton onClick={onClckCloseRight}>닫기버튼</CloseButton>
          </RightInfo>
        )}

        {rightCash && (
          <RightInfo>
            <h1>금액 충전</h1>
            <CloseButton onClick={onClckCloseRight}>닫기버튼</CloseButton>
          </RightInfo>
        )}

        {rightMember && (
          <RightInfo>
            <h1>회원 탈퇴</h1>
            <InputBox placeholder="이름" type="text" onChange={onChangeName} />
            <p>{msgName}</p>
            <InputBox placeholder="ID" type="text" onChange={onChangeId} />
            <p>{msgId}</p>
            <InputBox placeholder="PW" type="text" onChange={onChangePw} />
            <p>{msgPw}</p>
            <InputBox
              placeholder="EMAIL"
              type="text"
              onChange={onChangeEmail}
            />
            <p>{msgEmail}</p>
            <CloseButton onClick={onClckCloseRight}>닫기버튼</CloseButton>
          </RightInfo>
        )} */}
      </Right>
    </Container>
  );
};

export default MyPage;

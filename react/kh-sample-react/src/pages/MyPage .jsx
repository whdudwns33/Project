import { useState, useReducer, useEffect } from "react";
import styled, { css } from "styled-components";
import { ResetButton } from "../components/MyPageComp";
import { CloseButton } from "../components/MyPageComp";
import { InputBox } from "../components/MyPageComp";

// 목차
// 1. css 스타일
// a. 레이어 배치
// 2. 컨트롤러

// 할일 컴포넌트 쪼개기, 데이터 정확히 입력 시 입력 창 등장 컨트롤

// a.
// 기본 컨테이너: 전체 레이어
const Container = styled.div`
  // PC
  @media (min-width: 450px) {
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    width: 1500px;
    height: 50vh;
    flex-wrap: wrap;
    display: flex;
    min-height: 1000px;
    justify-content: space-evenly;
    background-color: #fff;
  }
  // 모바일
  @media (max-width: 450px) {
    box-sizing: border-box;
    width: 450px;
    height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
`;

// 좌측 레이어, 모바일은 전체
// 좌측(이미지 및 정보보여주기, 정보 출력)
const Left = styled.div`
  // PC
  @media (min-width: 450px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    height: 98%;
    margin-top: 5px;
    border-radius: 10px;
    box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
    background: #ebecf0;
  }
  // 모바일
  @media (max-width: 450px) {
    width: 100%;
    height: 100%;
    min-height: 380px;
    border-radius: 10px;
    box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
    background: #ebecf0;
  }
`;
// 좌측 상단 이미지 및 정보 부모 레이어, 모바일은 최상단
const LeftTop = styled.div`
  //pc
  @media (min-width: 450px) {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  // 모바일
  @media (max-width: 450px) {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;
// 이미지 레이어
const Imagine = styled.div`
  @media (min-width: 450px) {
    box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
    border-radius: 50%;
    width: 50%;
    height: 50%;
    margin-bottom: 50px;
    background-image: url("/태연.jpg");
  }
  @media (max-width: 450px) {
    margin-top: 30px;
    margin-bottom: 30px;
    box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
    border-radius: 50%;
    width: 50%;
    height: 50%;
  }
`;
// 정보 레이어
const InfoBox = styled.div`
  @media (min-width: 450px) {
    width: 80%;
    height: 30%;
    display: flex;
    flex-wrap: wrap;
    box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
    justify-content: space-around;
  }
  @media (max-width: 450px) {
    width: 80%;
    height: 30%;
    display: flex;
    box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
    align-items: center;
    justify-content: space-around;
  }
`;
// 정보의 이름 레이어
const InfoName = styled.div`
  @media (min-width: 450px) {
    width: 100px;
    margin-top: 1%;
    margin-bottom: 10px;
  }
  @media (max-width: 450px) {
    margin: 0;
  }
`;
// 정보의 결과 레이어
const InfoResult = styled.div`
  @media (min-width: 450px) {
    margin-top: 1%;
  }
  @media (max-width: 450px) {
  }
`;

// 좌측 하단 전체 레이어
const LeftBottom = styled.div`
  @media (min-width: 450px) {
    width: 80%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
  }
  @media (max-width: 450px) {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
// 좌측 하단 버튼들의 레이어
const LeftButton = styled.div`
  @media (min-width: 450px) {
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid red;
  }
  @media (max-width: 450px) {
    width: 80%;
    height: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid red;
    flex-wrap: wrap;
  }
`;

// 우측 레이어, 모바일시 어퍼 레이어
// 우측 실제로 정보를 변경하는 레이어
const Right = styled.div`
  // PC
  @media (min-width: 450px) {
    background-color: #ff4b2b;
    border-radius: 10px;
    width: 50%;
    height: 98%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    margin-top: 5px;
    box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
  }
  @media (max-width: 450px) {
    position: absolute;
    width: 80%;
    min-width: 300px;
    height: 80%;
    border-radius: 5%;
    background-color: #ff4b2b;
    border-radius: 10px;
    color: white;
    box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
    display: ${(props) => (props.isVisible ? "flex" : "none")};
  }
`;
// 우측 정보 창 등장
// 처음은 그냥 평범한 애니메이션

// 정보 수정창
const RightInfo = styled.div`
  @media (min-width: 450px) {
    box-shadow: -5px -5px 1px #fff, 5px 5px 1px #babebc;
    border-radius: 10px;
    width: 80%;
    height: 80%;
    animation-name: Info-animation;
    animation-duration: 0.3s;
    color: white;
  }
  @media (max-width: 450px) {
    box-shadow: -5px -5px 1px #fff, 5px 5px 1px #babebc;
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    align-content: space-evenly;
    text-align: center;
    animation-name: Info-animation;
    animation-duration: 0.3s;
  }
  @keyframes Info-animation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// 제약조건 확인
const Rst = styled.p`
  @media (min-width: 450px) {
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: black;
  }
  @media (max-width: 450px) {
    margin: 0;
    padding: 0;
  }
`;

// 2.
// a. 입력받은 정보를 객체로 저장하는 함수 reducer
const reducer = (data, action) => {
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
// b. 입력 컨트롤러: 회원 정보 수정(아이디, 비밀번호, 회원탈퇴), 금액 충전
const ControllInfo = () => {
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

  // ㄷ. 정보 입력. useReducer 사용해보기, reducer 함수를 만들어서 배열로 데이터 관리
  const [data, dispatch] = useReducer(reducer, {
    name: "",
    id: "",
    pw: "",
    email: "",
  });
  // ㄹ. 제약 조건
  const [msgName, setNameMsg] = useState("이름 형식에 맞추어 입력하시오.");
  const [msgId, setIdMsg] = useState("아이디 형식에 맞추어 입력하시오.");
  const [msgPw, setPwMsg] = useState("비밀번호 형식에 맞추어 입력하시오.");
  const [msgEmail, setEmailMsg] = useState("이메일 형식에 맞추어 입력하시오.");
  // 이름 제약 조건
  const onChangeName = (e) => {
    const inputName = e.target.value;
    if (inputName.length >= 2 && !/[0-9!@#$%^&*(),.?":{}|<>]/.test(inputName)) {
      dispatch({ type: "Name", value: inputName });
      setNameMsg("유효합니다.");
      setCheckName(true);
    } else {
      dispatch({ type: "Name", value: false });
      setNameMsg("유효하지 않습니다.");
      setCheckName(false);
    }
  };
  // 아이디 제약 조건
  const onChangeId = (e) => {
    const inputId = e.target.value;
    if (/^[a-zA-Z0-9]{8,20}$/.test(inputId)) {
      dispatch({ type: "Id", value: inputId });
      setIdMsg("유효합니다.");
      setCheckId(true);
    } else {
      dispatch({ type: "Id", value: false });
      setIdMsg("유효하지 않습니다.");
      setCheckId(false);
    }
  };
  // 비밀번호 제약 조건
  const onChangePw = (e) => {
    const inputPw = e.target.value;
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        inputPw
      )
    ) {
      dispatch({ type: "Pw", value: inputPw });
      setPwMsg("유효합니다.");
      setCheckPw(true);
    } else {
      dispatch({ type: "Pw", value: false });
      setPwMsg("유효하지 않습니다.");
      setCheckPw(false);
    }
  };
  // 이메일 제약 조건
  const onChangeEmail = (e) => {
    const inputEmail = e.target.value;
    if (/^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/.test(inputEmail)) {
      dispatch({ type: "Email", value: inputEmail });
      setEmailMsg("유효합니다.");
      setCheckEmail(true);
    } else {
      dispatch({ type: "Email", value: false });
      setEmailMsg("유효하지 않습니다.");
      setCheckEmail(false);
    }
  };
  // 기본 이름 아이디 등 입력하고 난후 입력 조건이 적절하면 등장하는 정보 수정 입력창
  const [checkName, setCheckName] = useState(false);
  const [checkId, setCheckId] = useState(false);
  const [checkPw, setCheckPw] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  let check = false;
  // 입력한 정보를 체크
  if (
    checkName === true &&
    checkId === true &&
    checkPw === true &&
    checkEmail === true
  ) {
    check = true;
  } else {
    check = false;
  }
  // 체크가 완료되면 정보 변경
  // 변경 아이디 제약 조건
  const [ID, setID] = useState("");
  const [msg, setMsg] = useState("");
  const onId = (e) => {
    setMsg("");
    const Id = e.target.value;
    if (/^[a-zA-Z0-9]{8,20}$/.test(Id)) {
      setMsg("유효합니다.");
      setID(Id);
    } else {
      setMsg("유효하지 않습니다.");
    }
  };
  // 변경 아이디 제약 조건
  const [PW, setPW] = useState("");
  const onPw = (e) => {
    setMsg("");
    const Pw = e.target.value;
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        Pw
      )
    ) {
      setMsg("유효합니다.");
      setPW(Pw);
    } else {
      setMsg("유효하지 않습니다.");
    }
  };

  return (
    <Container>
      <Left>
        <LeftTop>
          <Imagine>
            <img src="/태연.jpg" alt="사진" />
          </Imagine>
          <InfoBox>
            <InfoName>
              <InfoName>회원 이름</InfoName>
              <InfoName>이메일</InfoName>
              <InfoName>전화번호</InfoName>
              <InfoName>소지금액</InfoName>
            </InfoName>
            <InfoResult>
              <p style={{ marginTop: "0" }}>결과 출력</p>
            </InfoResult>
          </InfoBox>
        </LeftTop>
        <LeftBottom>
          <LeftButton>
            <ResetButton onClick={onClickId}>아이디 변경</ResetButton>
            <ResetButton onClick={onClickPw}>비밀번호 변경</ResetButton>
            <ResetButton onClick={onClickCash}>금액충전</ResetButton>
            <ResetButton onClick={onClickMember}>회원탈퇴</ResetButton>
          </LeftButton>
        </LeftBottom>
      </Left>

      <Right isVisible={isRightVisible}>
        {rightIdInfo && (
          <RightInfo>
            <h1>아이디 변경</h1>
            <InputBox placeholder="이름" type="text" onChange={onChangeName} />
            <Rst>{msgName}</Rst>
            <InputBox placeholder="ID" type="text" onChange={onChangeId} />
            <Rst>{msgId}</Rst>
            <InputBox placeholder="PW" type="text" onChange={onChangePw} />
            <Rst>{msgPw}</Rst>
            <InputBox
              placeholder="EMAIL"
              type="text"
              onChange={onChangeEmail}
            />
            <Rst>{msgEmail}</Rst>
            {check && (
              <div>
                <InputBox placeholder="변경할 아이디 입력" onChange={onId} />
                {msg && <div>{msg}</div>}
              </div>
            )}

            <CloseButton onClick={onClckCloseRight}>닫기버튼</CloseButton>
          </RightInfo>
        )}

        {rightPwInfo && (
          <RightInfo>
            <h1>비밀번호 변경</h1>
            <InputBox placeholder="이름" type="text" onChange={onChangeName} />
            <Rst>{msgName}</Rst>
            <InputBox placeholder="ID" type="text" onChange={onChangeId} />
            <Rst>{msgId}</Rst>
            <InputBox placeholder="PW" type="text" onChange={onChangePw} />
            <Rst>{msgPw}</Rst>
            <InputBox
              placeholder="EMAIL"
              type="text"
              onChange={onChangeEmail}
            />
            <Rst>{msgEmail}</Rst>
            {check && (
              <div>
                <InputBox placeholder="변경할 비밀번호 입력" onChange={onPw} />
                {msg && <div>{msg}</div>}
              </div>
            )}

            <CloseButton onClick={onClckCloseRight}>닫기버튼</CloseButton>
          </RightInfo>
        )}

        {rightCash && (
          <RightInfo>
            <h1>현금 충전</h1>
            충전 방식 및 충전 금액 입력창
            <CloseButton onClick={onClckCloseRight}>닫기버튼</CloseButton>
          </RightInfo>
        )}

        {rightMember && (
          <RightInfo>
            <h1>회원 탈퇴</h1>
            <InputBox placeholder="이름" type="text" onChange={onChangeName} />
            <Rst>{msgName}</Rst>
            <InputBox placeholder="ID" type="text" onChange={onChangeId} />
            <Rst>{msgId}</Rst>
            <InputBox placeholder="PW" type="text" onChange={onChangePw} />
            <Rst>{msgPw}</Rst>
            <InputBox
              placeholder="EMAIL"
              type="text"
              onChange={onChangeEmail}
            />
            <Rst>{msgEmail}</Rst>
            <CloseButton onClick={onClckCloseRight}>닫기버튼</CloseButton>
          </RightInfo>
        )}
      </Right>
    </Container>
  );
};

export default ControllInfo;

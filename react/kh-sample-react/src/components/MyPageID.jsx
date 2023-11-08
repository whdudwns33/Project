import { useState, useReducer } from "react";
import { reducer } from "../pages/MyPage ";
import AxiosApi from "../api/MyPageAxiosApi";
import { InputBox, InputTag } from "./MyPageComp";
import { StyledButton } from "../globalStyle/StyledButton";
import { useNavigate } from "react-router-dom/dist";
const MyPageID = () => {
  const [data, dispatch] = useReducer(reducer, {
    name: "",
    id: "",
    pw: "",
    email: "",
  });

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
  // 체크
  const [checkName, setCheckName] = useState(false);
  const [checkId, setCheckId] = useState(false);
  const [checkPw, setCheckPw] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  // 백엔드 이후 체크된 정보를 토대로 true or false
  const [checkedInfo, setCheckedInfo] = useState(false);
  const onClickCheck = async () => {
    const checked = await AxiosApi.memberCheck(
      data.name,
      data.id,
      data.pw,
      data.email
    );
    console.log(checked);
    console.log("온 클릭 체크 이후 결과가 잘 찍혔습니다.");
    console.log(data.name, data.id, data.pw, data.email);
    if (checked.data === true) {
      console.log("체크가 true입니다.");
      setCheckedInfo(true);
      setOldIsVisible(false);
      setNewIsVisible(true);
    } else {
      console.log("체크가 false입니다.");
      setCheckedInfo(false);
    }
  };

  // 변경 아이디 제약 조건
  const [newId, setNewId] = useState("");
  const [msg, setMsg] = useState("");
  const onModifyId = (e) => {
    setMsg("");
    if (/^[a-zA-Z0-9]{8,20}$/.test(e.target.value)) {
      setMsg("유효합니다.");
      setNewId(e.target.value);

      setCheckTrue(true);
    } else {
      setMsg("유효하지 않습니다.");
      setCheckTrue(false);
    }
  };
  const [checkTrue, setCheckTrue] = useState(false);
  const onClickModifyId = async () => {
    try {
      const chId = await AxiosApi.modifyID(data.id, newId);
      console.log("newId의 값:", newId); // newId의 값을 확인
      console.log("제출된 아이디가 잘 찍혔습니다." + chId.data);
      if (chId.data === true) {
        setCheckTrue(true);
        console.log("아이디 변경");
        alert("아이디가 변경되었습니다.");
        // 아이디 변경 시 로그 아웃
      } else {
        setCheckTrue(false);
        console.log("아이디 변경 실패");
      }
    } catch (error) {
      console.error("ID 변경 중 오류 발생:", error);
    }
  };

  // 정보 제출 이후에 조건이 달성되면 해당 페이지 사라지고 다음 페이지 등장
  const [isOldVisible, setOldIsVisible] = useState(true);
  const [isNewVisible, setNewIsVisible] = useState(false);
  return (
    <>
      <h1>아이디 변경</h1>
      {isOldVisible && (
        <>
          <InputTag>
            <p>아이디를 변경합니다.</p>
            <div className="InpuTitle">
              <p className="littleTitle">이 름 : </p>
              <InputBox
                height="100%"
                width="70%"
                placeholder="이름"
                type="text"
                onChange={onChangeName}
              />
            </div>
            <p>{msgName}</p>
            <div className="InpuTitle">
              <p className="littleTitle">아이디 : </p>
              <InputBox
                height="100%"
                width="70%"
                placeholder="아이디"
                type="text"
                onChange={onChangeId}
              />
            </div>
            <p>{msgId}</p>
            <div className="InpuTitle">
              <p className="littleTitle">비밀번호 : </p>
              <InputBox
                height="100%"
                width="70%"
                placeholder="비밀번호"
                type="text"
                onChange={onChangePw}
              />
            </div>
            <p>{msgPw}</p>
            <div className="InpuTitle">
              <p className="littleTitle">이메일 : </p>
              <InputBox
                height="100%"
                width="70%"
                placeholder="이메일"
                type="text"
                onChange={onChangeEmail}
              />
            </div>
            <p>{msgEmail}</p>

            {checkName && checkId && checkPw && checkEmail && (
              <StyledButton
                width="40%"
                height="5%"
                value="정보 확인"
                onClick={onClickCheck}
              ></StyledButton>
            )}
          </InputTag>
        </>
      )}

      {isNewVisible && (
        <InputTag>
          {checkedInfo && (
            <>
              <p>새로운 아이디를 입력하시오.</p>
              <InputBox
                width="60%"
                height="10%"
                placeholder="NEW ID"
                type="text"
                onChange={onModifyId}
              />
              <p>{msg}</p>
              {checkTrue && (
                <StyledButton
                  value="아이디 변경"
                  width="40%"
                  height="7%"
                  onClick={onClickModifyId}
                ></StyledButton>
              )}
            </>
          )}
        </InputTag>
      )}
    </>
  );
};

export default MyPageID;

import { useState, useReducer } from "react";
import { reducer } from "../pages/MyPage ";
import AxiosApi from "../api/MyPageAxiosApi";
import { InputBox, SetButton, InputTag } from "./MyPageComp";

const MyPagePW = () => {
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
    } else {
      console.log("체크가 false입니다.");
      setCheckedInfo(false);
    }
  };

  // 변경 비밀번호 제약 조건
  const [newPw, setNewPw] = useState("");
  const [msg, setMsg] = useState("");
  const onModifyPw = (e) => {
    setMsg("");
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        e.target.value
      )
    ) {
      setMsg("유효합니다.");
      setNewPw(e.target.value);
      setCheckTrue(true);
    } else {
      setMsg("유효하지 않습니다.");
      setCheckTrue(false);
    }
  };
  const [checkTrue, setCheckTrue] = useState(false);
  const onClickModifyPw = async () => {
    try {
      const chPw = await AxiosApi.modifyPW(data.pw, newPw);
      console.log("newPw의 값:", newPw); // newId의 값을 확인
      console.log("제출된 비밀번호가 잘 찍혔습니다." + chPw.data);
      if (chPw === true) {
        setCheckTrue(true);
      } else {
        setCheckTrue(false);
      }
    } catch (error) {
      console.error("PW 변경 중 오류 발생:", error);
    }
  };

  return (
      <>
        <InputTag>
          <h1>비밀번호 변경</h1>
          <InputBox placeholder="이름" type="text" onChange={onChangeName} />
          <p>{msgName}</p>
          <InputBox placeholder="ID" type="text" onChange={onChangeId} />
          <p>{msgId}</p>
          <InputBox placeholder="PW" type="text" onChange={onChangePw} />
          <p>{msgPw}</p>
          <InputBox placeholder="EMAIL" type="text" onChange={onChangeEmail} />
          <p>{msgEmail}</p>
          {checkName && checkId && checkPw && checkEmail && (
            <SetButton width="40%" height="10%" onClick={onClickCheck}>
              정보 확인
            </SetButton>
          )}
          {/* ture 백에서 받아와서 아이디 변경 */}
          {checkedInfo && (
            <>
              <InputBox
                placeholder="NEW PW"
                type="text"
                onChange={onModifyPw}
              />
              <p>{msg}</p>

              {checkTrue && (
                <SetButton width="40%" height="10%" onClick={onClickModifyPw}>
                  정보 수정
                </SetButton>
              )}
            </>
          )}
        </InputTag>
      </>
  );
};

export default MyPagePW;

import { useState, useEffect } from "react";
import { InputBox, SetButton, InputTag, DivRow } from "./MyPageComp";
import axios from "axios";
import AxiosApi from "../api/MyPageAxiosApi";
import { useUser } from "../contexts/Context";
import { StyledButton } from "../globalStyle/StyledButton";

const MyPageCash = () => {
  const { checkLoginStatus, isLoggedin, user } = useUser();
  const [cash, setCash] = useState();
  const [isClick, setIsClick] = useState(false);
  const [cashCheck, setCashCheck] = useState(false);
  const [clickName, setClickName] = useState("");
  // 클릭 시 결제창 등장
  // 클릭 시 클릭한 버튼의 이름 저장 및 출력
  const onClickCashBtn = (e) => {
    setIsClick(true);
    setClickName(e.target.name);
  };
  const onChangeCash = (e) => {
    setCash(e.target.value);
  };
  const onClickCharge = async () => {
    try {
      const charge = await AxiosApi.chargeAmout(user.id, cash);
      console.log("금액충전" + user.id);
      console.log(cash);
      if (charge.data === true) {
        console.log("현금이 충전되었습니다.");
        setCashCheck(true);
        window.location.reload();
      } else {
        console.log("현금이 충전되지 않았습니다.");
        setCashCheck(true);
        window.location.reload();
      }
    } catch (error) {
      console.error("변경 중 오류 발생:", error);
    }
  };

  return (
    <>
      <InputTag>
        <h1>금액 충전</h1>
        <DivRow>
          <button className="chooseBank" name="카카오" onClick={onClickCashBtn}>
            <img src="" alt="카카오" />
          </button>
          <button className="chooseBank" name="네이버" onClick={onClickCashBtn}>
            <img src="" alt="네이버" />
          </button>
          <button className="chooseBank" name="은행" onClick={onClickCashBtn}>
            <img src="" alt="은행" />
          </button>
        </DivRow>
        <p>{clickName}</p>
        <InputBox
          placeholder="충전할 금액 입력"
          onChange={onChangeCash}
        ></InputBox>
        <StyledButton width="20%" height="5%" onClick={onClickCharge}>
          금액 충전
        </StyledButton>
        {cashCheck}
      </InputTag>
    </>
  );
};

export default MyPageCash;

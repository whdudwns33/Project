import { useState } from "react";
import {
  InputBox,
  Bank,
  MyPageButton,
  CashCharge,
  BankButton,
  CashTag,
} from "./MyPageComp";
import MyPageAxiosApi from "../api/MyPageAxiosApi";
import { useUser } from "../contexts/Context";
import Modal from "../utils/LoginModal";
import KAKAO from "../assets/images/loginLogo/kakao.png";
import NAVER from "../assets/images/loginLogo/naver.png";
import KB from "../assets/images/loginLogo/kb.png";
import NH from "../assets/images/loginLogo/nh.png";
import SH from "../assets/images/loginLogo/sh.png";
import WOORI from "../assets/images/loginLogo/woori.png";

const MyPageCash = () => {
  const { user } = useUser();
  const [cash, setCash] = useState();
  const [clickName, setClickName] = useState("");
  //모달창 제어
  const [rst, setRst] = useState(false);
  const closeModal = () => {
    setRst(false);
    window.location.reload();
  };

  // 클릭 시 결제창 등장
  // 클릭 시 클릭한 버튼의 이름 저장 및 출력
  const onClickCashBtn = (e) => {
    setClickName(e.target.name);
  };
  const onChangeCash = (e) => {
    setCash(e.target.value);
  };
  const onClickCharge = async () => {
    try {
      const charge = await MyPageAxiosApi.chargeAmout(user.id, cash);
      console.log("금액충전" + user.id);
      console.log(cash);
      if (charge.data === true) {
        console.log("현금이 충전되었습니다.");
        setRst(true);
      } else {
        console.log("현금이 충전되지 않았습니다.");
      }
    } catch (error) {
      console.error("변경 중 오류 발생:", error);
    }
  };

  return (
    <>
      <CashTag>
        <CashCharge>
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            금액 충전
          </h1>
          <Bank>
            <BankButton
              className="chooseBank"
              name="카카오"
              src={KAKAO}
              onClick={onClickCashBtn}
            />
            <BankButton
              className="chooseBank"
              name="네이버"
              src={NAVER}
              onClick={onClickCashBtn}
            />
            <BankButton
              className="chooseBank"
              name="KB"
              src={KB}
              onClick={onClickCashBtn}
            />
          </Bank>
          <Bank>
            <BankButton
              className="chooseBank"
              name="신한"
              src={SH}
              onClick={onClickCashBtn}
            />
            <BankButton
              className="chooseBank"
              name="우리"
              scr={WOORI}
              backgroundSize="cover"
              onClick={onClickCashBtn}
            />
            <BankButton
              className="chooseBank"
              name="농협"
              scr={NH}
              onClick={onClickCashBtn}
            />
          </Bank>
          <p>{clickName}</p>
          <InputBox
            height="10%"
            placeholder="충전할 금액 입력"
            onChange={onChangeCash}
          ></InputBox>
          <MyPageButton onClick={onClickCharge}>금액 충전</MyPageButton>
          <Modal open={rst} close={closeModal}>
            금액이 충전되었습니다.
          </Modal>
        </CashCharge>
      </CashTag>
    </>
  );
};

export default MyPageCash;

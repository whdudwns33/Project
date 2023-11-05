import { useState ,useEffect } from "react";
import { InputBox, SetButton, InputTag, DivRow } from "./MyPageComp";
import axios from "axios";
import AxiosApi from "../api/MyPageAxiosApi";

const MyPageCash = () => {
    // 테스트용 id
    const id = "jojo6807";
    

    const [cash, setCash] = useState();
    const [isClick, setIsClick] = useState(false);
    const [cashCheck, setCashCheck ] = useState(false);
    const [clickName, setClickName] = useState("");
    // 클릭 시 결제창 등장
    // 클릭 시 클릭한 버튼의 이름 저장 및 출력
    const onClickCashBtn = (e) => {
        setIsClick(true);
        setClickName(e.target.name);
    }
    const onChangeCash = (e) => {
        setCash(e.target.value);
    }
    const onClickCharge = async () => {
        try {
            const charge = await AxiosApi.chargeAmout(id, cash);
            console.log(id);
            console.log(cash);
            if (charge.data === true) {
                console.log("현금이 충전되었습니다.");
                setCashCheck(true);
            }
            else {
                console.log("현금이 충전되지 않았습니다.");
                setCashCheck(true);
            }
        }
        catch (error) {
            console.error("ID 변경 중 오류 발생:", error);
          }
    }

    
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
                {isClick && (
                    <>
                        <InputBox placeholder="충전할 금액 입력" onChange={onChangeCash}></InputBox>
                        <SetButton width = "20%" height = "5%" onClick={onClickCharge} >금액 충전</SetButton>
                        {cashCheck}
                    </>
                )}
         </InputTag>
        </>
    )
}

export default MyPageCash;
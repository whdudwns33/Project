import styled from "styled-components";

// 이미지
import menu_1 from "../assets/images/leaf_1.png";
import menu_2 from "../assets/images/leaf_2.png";
import menu_3 from "../assets/images/leaf_3.png";
import walkingMouse from "../assets/images/good.gif";

// 상단 고정바
const Top = styled.div`
  width: 100%;
  height: 9vh;
  position: sticky;
  top: 0;
  z-index: 25;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  position: absolute;
  top: -60px;
`;

const TopDown = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
`;

const MouseImg = styled.img`
  text-align: center;
  z-index: 0;
`;

const TopImgNavLeft = styled.img`
  max-width: 8vw;
  min-width: 100px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const TopImgNavMiddle = styled.img`
  max-width: 8vw;
  min-width: 100px;
  position: relative;
  top: 22px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const TopImgNavRight = styled.img`
  max-width: 8vw;
  min-width: 100px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

export const StyledTop = () => {
  return (
    <>
      <Top>
        <TopUp>
          <TopImgNavLeft src={menu_1}></TopImgNavLeft>
          <TopImgNavMiddle src={menu_2}></TopImgNavMiddle>
          <TopImgNavRight src={menu_3}></TopImgNavRight>
        </TopUp>
      </Top>
      <TopDown>
        <MouseImg src={walkingMouse}></MouseImg>
      </TopDown>
    </>
  );
};

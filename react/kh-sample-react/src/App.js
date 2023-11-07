import "./App.css";
import MyPage from "./pages/MyPage ";
import { GlobalStyle } from "./components/MyPageComp";
// import ImageUploader from "./components/MyPageProfile";
// 할일
// useState로 메모리 관리.
// 테스트 아이디로 정보 조회하기 -> 메인에서
// 문자 인증 만들기
// 파이어 베이스 등록하기

function App() {
  return (
    <>
      <GlobalStyle />
      <MyPage />
      {/* <ImageUploader /> */}
    </>
  );
}

export default App;

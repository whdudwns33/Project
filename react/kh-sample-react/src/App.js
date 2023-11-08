import { Outlet } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ViewerPage } from "./pages/ViewerPage";
// import { SearchResultPage } from "./pages/SearchResultPage";
// import { SalesGraph } from "./utils/SalesGraph";
// import Login from "./pages/LoginPage";
// import { BookAdminPage } from "./pages/BookAdminPage";
// import { MainPage } from "./pages/MainPage";
// import { UserProvider } from "./contexts/Context";
// import BuyReviewPg from "./pages/BuyReviewPage";
import MyPage from "./pages/MyPage ";
// import CartPage from "./pages/CartPage";
import Footer from "./components/mainPageComp/smallComps/Footer";
function App() {
  return (
    // <>
    //   <UserProvider>
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path="/" element={<MainPage></MainPage>}></Route>
    //         <Route
    //           path="/ViewerPage"
    //           element={<ViewerPage></ViewerPage>}
    //         ></Route>
    //         <Route
    //           path="/SearchResultPage"
    //           element={<SearchResultPage></SearchResultPage>}
    //         ></Route>
    //         <Route
    //           path="/SalesGraph"
    //           element={<SalesGraph></SalesGraph>}
    //         ></Route>
    //         <Route path="/" element={<Login />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/purchase" element={<BuyReviewPg />} />
    //         <Route
    //           path="/BookAdminPage"
    //           element={<BookAdminPage></BookAdminPage>}
    //         ></Route>
    //         <Route path="/MyPage" element={<MyPage></MyPage>} />
    //         <Route path="CartPage" element={<CartPage></CartPage>} />
    //       </Routes>
    //     </BrowserRouter>
    //   </UserProvider>
    // </>
    <>
      <MyPage />
      <Footer>
        <Outlet />
      </Footer>
    </>
  );
}

export default App;

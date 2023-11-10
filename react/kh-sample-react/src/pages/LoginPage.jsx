import React, { useState, useEffect } from "react";
import KakaoColorImg from "../assets/images/kakao_color.png";
import KakaoImg from "../assets/images/kakao_white.png";
import {
  Wrapper,
  Container,
  Form,
  Input,
  Button,
  SocialLinks,
  SocialLink,
  OverlayButton,
  OverlayLeft,
  OverlayRight,
  ErrorText,
} from "../components/LoginComponent";
import AxiosApi from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/LoginModal";
import EmailVerificationComponent from "../components/MailComponent";
import { useUser } from "../contexts/Context";
import sha256 from "crypto-js/sha256";

const Login = () => {
  const [socialImage, setSocialImage] = useState(KakaoColorImg); // 초기 이미지 설정
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPwd] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState();
  const [isIdDup, setIsIdDup] = useState(false);
  const [isPhoneDup, setIsPhoneDup] = useState(false);

  const { isLoggedin, checkLoginStatus, login, user } = useUser();

  const navigate = useNavigate();

  const closeModal = () => {
    setLoginModalOpen(false);
  };

  const socialHover = () => {
    setSocialImage(KakaoColorImg);
  };

  const socialLeave = () => {
    setSocialImage(KakaoImg);
  };

  const toggleRightPanel = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  const [signUpData, setSignUpData] = useState({
    id: "",
    password: "",
    name: "",
    phone: "",
  });

  const [dataErrors, setDataErrors] = useState({
    id: null,
    password: null,
    email: null,
    phone: null,
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const validateId = () => {
    const idRegex = /^[a-zA-Z0-9]{8,20}$/;
    const idError = !idRegex.test(signUpData.id)
      ? "ID 8~20자의 영문 대소문자와 숫자 조합이어야 합니다."
      : false;

    setDataErrors((prevErrors) => ({
      ...prevErrors,
      id: idError,
    }));
  };
  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    const passwordError = !passwordRegex.test(signUpData.password)
      ? "Password 8~20자의 대소문자, 특수문자, 숫자를 포함해야 합니다."
      : false;

    setDataErrors((prevErrors) => ({
      ...prevErrors,
      password: passwordError,
    }));
  };
  const validatePhone = () => {
    const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;

    const phoneError = !phoneRegex.test(signUpData.phone)
      ? "올바른 전화번호 형식이 아닙니다."
      : false;

    setDataErrors((prevErrors) => ({
      ...prevErrors,
      phone: phoneError,
    }));
  };

  const checkIdDuplicate = async () => {
    const res = await AxiosApi.checkDuplicate(signUpData.id);
    console.log(res.data);
    if (res.data) {
      setDataErrors((prevErrors) => ({
        ...prevErrors,
        id: "이미 사용중인 ID입니다.",
      }));
    } else {
      setIsIdDup(true);
    }
  };

  const checkPhoneDuplicate = async () => {
    const res = await AxiosApi.checkDuplicate(signUpData.phone);
    console.log(res.data);
    if (res.data) {
      setDataErrors((prevErrors) => ({
        ...prevErrors,
        phone: "이미 사용중인 전화번호입니다.",
      }));
    } else {
      setIsPhoneDup(true);
    }
  };

  const onBlurDuplicate = async (e) => {
    const { name } = e.target;
    if (name === "id") {
      await checkIdDuplicate();
    } else if (name === "phone") {
      await checkPhoneDuplicate();
    }
  };

  // 자식 호출 받는 함수
  // const verifyEmail = (value) => {
  //   setIsVerified(value);
  // };

  useEffect(() => {
    checkLoginStatus(); // 로그인 상태 확인
  }, [signUpData, isVerified]);

  useEffect(() => {
    if (
      dataErrors.id === false &&
      dataErrors.password === false &&
      dataErrors.phone === false &&
      isVerified
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [dataErrors, isIdDup, isPhoneDup, isVerified]);

  useEffect(() => {
    if (isLoggedin) {
      const checkAndRedirect = async () => {
        console.log(user);
        // 원하는 페이지로 리다이렉트
        // if (isLoggedin) {
        //   navigate("/PurchasePage");
        // }
      };
      checkAndRedirect();
    }
  }, [user]);

  const textChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    const hashedPassword = sha256(inputPw).toString();
    const res = await AxiosApi.memberLogin(inputId, hashedPassword);
    console.log(res.data);
    if (res.data) {
      window.localStorage.setItem("userId", inputId);
      window.localStorage.setItem("userPw", inputPw);
      window.localStorage.setItem("isLogin", "TRUE");
      // 로그인이 성공하면 토큰을 클라이언트에 저장
      const token = res.data; // 토큰 응답 데이터
      console.log(token);

      if (token) {
        window.localStorage.setItem("authToken", token); // 토큰을 로컬 스토리지에 저장
        login(res, token);
      }

      navigate("/");
    } else {
      setLoginModalOpen(true);
    }
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    if (isIdDup && isPhoneDup) {
      const res = await AxiosApi.memberSignup(
        signUpData.id,
        signUpData.password,
        verifiedEmail,
        signUpData.phone
      );

      if (res.data) {
        alert("회원가입이 완료되었습니다."); // 회원가입 성공 알림
        window.location.reload(); // 현재 페이지 새로 고침
      }
    } else {
      alert("이미 중복된 데이터가 존재합니다."); // 중복 오류 알림
      window.location.reload(); // 현재 페이지 새로 고침
    }
  };

  return (
    <Wrapper>
      <Container>
        <Form $isRightPanelActive={isRightPanelActive}>
          {!isRightPanelActive ? (
            <>
              <h1>Sign In</h1>
              <SocialLinks>
                <SocialLink>
                  <img
                    src={socialImage}
                    alt="cacao"
                    style={{ width: "100%", height: "100%" }}
                    onMouseEnter={socialHover}
                    onMouseLeave={socialLeave}
                  />
                </SocialLink>
              </SocialLinks>
              <span>or use your account</span>
              <Input
                type="text"
                placeholder="ID"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={inputPw}
                onChange={(e) => setInputPwd(e.target.value)}
                autoComplete="current-password"
              />
              <Button className="form_btn" onClick={loginSubmit}>
                Login
              </Button>
              <Modal open={loginModalOpen} close={closeModal} header="error">
                아이디와 패스워드를 확인해주세요.
              </Modal>
            </>
          ) : (
            <>
              <h1>Create Account</h1>
              <Input
                type="text"
                name="id"
                placeholder="Name"
                value={signUpData.id}
                onChange={(e) => {
                  textChange(e);
                  validateId();
                }}
                onBlur={onBlurDuplicate}
                onFocus={validateId}
              />
              {dataErrors.id && <ErrorText>{dataErrors.id}</ErrorText>}
              <Input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                value={signUpData.password}
                onChange={(e) => {
                  textChange(e);
                  validateId();
                }}
                onFocus={validatePassword}
              />
              {dataErrors.password && (
                <ErrorText>{dataErrors.password}</ErrorText>
              )}
              <Input
                type="text"
                name="phone"
                placeholder="Phone"
                value={signUpData.phone}
                onChange={(e) => {
                  textChange(e);
                  validateId();
                }}
                onBlur={onBlurDuplicate}
                onFocus={validatePhone}
              />
              {dataErrors.phone && <ErrorText>{dataErrors.phone}</ErrorText>}
              <EmailVerificationComponent
                onVerification={setIsVerified}
                onVerifiedEmail={setVerifiedEmail}
              />
              <Button disabled={isSubmitDisabled} onClick={signupSubmit}>
                Sign Up
              </Button>
            </>
          )}
        </Form>
        {isRightPanelActive ? (
          <OverlayLeft $isRightPanelActive={isRightPanelActive}>
            <h1>Welcome Back</h1>
            <p>
              To keep connected with us, please login with your personal info
            </p>
            <OverlayButton onClick={toggleRightPanel}>Login</OverlayButton>
          </OverlayLeft>
        ) : (
          <OverlayRight $isRightPanelActive={isRightPanelActive}>
            <h1>Hello, Friend</h1>
            <p>Enter your personal details and start a journey with us</p>
            <OverlayButton onClick={toggleRightPanel}>Sign Up</OverlayButton>
          </OverlayRight>
        )}
      </Container>
    </Wrapper>
  );
};

export default Login;

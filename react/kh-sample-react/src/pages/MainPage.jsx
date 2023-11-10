import React from "react";
import { useInView } from "react-intersection-observer";
import styled, { css } from "styled-components";
import Main from "../components/mainPageComp/Main";
import { StyledTop } from "../globalStyle/StyledTop";
import { StyledBackground } from "../globalStyle/StyledBackground";
import Footer from "../components/mainPageComp/Footer";
import { useEffect } from "react";
import { useUser } from "../contexts/Context";

const fadeInOutAnimation = css`
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  ${({ inView }) =>
    inView
      ? `opacity: 1; transform: translateY(0px);`
      : `opacity: 0; transform: translateY(-30px);`}
`;

const AnimatedStyledTop = styled(StyledTop)`
  ${fadeInOutAnimation}
`;

export const MainPage = () => {
  const { checkLoginStatus, isLoggedin, user } = useUser();

  const [topRef, topInView] = useInView({
    threshold: 0.1,
    triggerOnce: false, // To ensure the animation occurs every time the component enters or leaves the viewport
  });

  useEffect(() => {
    console.log(user);
    console.log("로그인 상태" + isLoggedin);
  }, []);
  return (
    <>
      <AnimatedStyledTop ref={topRef} inView={topInView} />
      <StyledBackground>
        <Main />
        <Footer />
      </StyledBackground>
    </>
  );
};

import React from 'react';
import styled from 'styled-components';

// Footer 컨테이너 스타일
const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
`;

// Footer 링크 스타일
const FooterLink = styled.a`
  color: #fff;
  margin: 0 10px;
  text-decoration: none;
  &:hover {
    color: #ddd;
  }
`;

// Footer 저작권 정보 스타일
const CopyRight = styled.p`
  margin-top: 10px;
  font-size: 0.8em;
  text-decoration: none;
`;

// Footer 컴포넌트
const Footer = () => {
  return (
    <FooterContainer>
      <nav>
        <FooterLink href="#">조영준</FooterLink>|
        <FooterLink href="#">정벼리</FooterLink>|
        <FooterLink href="#">길종환</FooterLink>|
        <FooterLink href="#">유동재</FooterLink>
      </nav>
      <CopyRight>&copy; {new Date().getFullYear()} My Company. All Rights Reserved.</CopyRight>
    </FooterContainer>
  );
};

export default Footer;
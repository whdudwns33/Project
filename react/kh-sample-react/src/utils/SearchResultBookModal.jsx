import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  min-height: 100vh;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  /* 바깥쪽 불투명도 */
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

const OverlayInner = styled.div`
  background: white;
  width: 700px;
  height: 550px;
  padding: 1.5rem;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 1.3rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 17px;
`;

const InnerBox = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const InnerBoxImg = styled.img`
  margin-right: 20px;
  width: 150px;
  height: 200px;
`;

const InnerBoxH3 = styled.h3`
  margin-top: 10px;
  color: green;
`;

const InnerBoxH4 = styled.h4`
  color: blue;
`;

// More Button
const Button = styled.button`
  border: none;
  width: 100px;
  border-radius: 5px;
  background-color: #24a0ed;
  color: white;
  font-weight: bold;
  padding: 0.3rem 0.5rem;

  &:hover {
    transform: scale(1.2);
    background-color: darkblue;
  }
`;

const Description = styled.div`
  margin-top: 2rem;
  text-align: justify;
  font-size: 13px;
`;

export const SearchResultBookModal = ({ show, item, onClose }) => {
  if (!show) {
    return null;
  }

  let thumbnail =
    item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;

  return (
    <Overlay>
      <OverlayInner>
        <CloseButton onClick={onClose}>
          <i className="fas fa-times"></i>X
        </CloseButton>
        <InnerBox>
          <InnerBoxImg src={thumbnail} alt="" />
          <div className="info">
            <h1>{item.volumeInfo.title}</h1>
            <InnerBoxH3>{item.volumeInfo.authors}</InnerBoxH3>
            <InnerBoxH4>
              {item.volumeInfo.publisher}
              <span>{item.volumeInfo.publishedDate}</span>
            </InnerBoxH4>
            <br />
            <a href={item.volumeInfo.previewLink}>
              <Button>More</Button>
            </a>
          </div>
        </InnerBox>
        <Description>{item.volumeInfo.description}</Description>
      </OverlayInner>
    </Overlay>
  );
};

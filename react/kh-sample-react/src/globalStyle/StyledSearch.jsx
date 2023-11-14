import styled from "styled-components";
import { StyledButton } from "./StyledButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 이미지
import { FaSearch, FaMicrophone } from "react-icons/fa";
import logoPhrase from "../assets/images/logoPhrase.png";

// 검색바
const SearchBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const SearchLogo = styled.img`
//   z-index: 15;
//   width: 15vh;
//   cursor: pointer;
//   &:hover {
//     transform: scale(1.1);
//   }
// `;

const SearchMode = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 45%;
  height: 40px;
  margin: 20px 20px;
  border: 1.5px solid #c9cacc;
  border-radius: 24px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 10;

`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  height: 100%;
  width: 100%;
  
  /* padding: 0 10px; */
  font-size: 16px;
  border-radius: 24px;
`;

const SearchIcon = styled.div`
  margin-left: 3%;
  cursor: pointer;
  svg {
    color: var(--gray);
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.2);
      color: var(--black);
    }
  }
`;

const MicIcon = styled.div`
  margin-right: 3%;
  cursor: pointer;
  svg {
    color: var(--gray);
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.2);
      color: var(--black);
    }
  }
`;

export const StyledSearch = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchBook = async () => {
    if (!search) {
      return;
    }

    const result = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: search,
          key: "AIzaSyBZeJKPL9ccyGsvYo3_JA5OHw6ohKwGGgw", // 보안에 문제
          maxResults: 20, // 한 페이지당 10개의 결과를 가져오도록 설정
        },
      }
    );

    // 검색 결과를 local storage에 저장합니다.
    localStorage.setItem("searchResult", JSON.stringify(result.data));

    // 검색 결과 페이지로 이동합니다.
    navigate("/SearchResultPage");

    // 검색 결과창에서 새로운 검색어를 입력했을때를 위한 처리
    window.location.reload(); // 페이지 새로고침
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchBook();
    }
  };

  return (
    <>
      <SearchBox>
        {/* <SearchLogo src={logo} alt="logo" /> */}
        <SearchMode>
          <SearchIcon>
            <FaSearch size={15} />
          </SearchIcon>
          <Input
            type="text"
            placeholder="Search any book!"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <MicIcon>
            <FaMicrophone size={15} />
          </MicIcon>
        </SearchMode>
        <StyledButton
          onClick={searchBook}
          value="Search!"
          width="100px"
          height="50px"
        ></StyledButton>
      </SearchBox>
    </>
  );
};

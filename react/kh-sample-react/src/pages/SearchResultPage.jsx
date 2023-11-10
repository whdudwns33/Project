import { useState, useEffect } from "react";
import axios from "axios";
import { SearchResultPageComp } from "../components/SearchResultPageComp";
import styled from "styled-components";
import { StyledSearch } from "../globalStyle/StyledSearch";
import { StyledTop } from "../globalStyle/StyledTop";
import { StyledButton } from "../globalStyle/StyledButton";
import { MiddleOrderBox } from "../globalStyle/MiddleOrderBox";

const Container = styled.div`
  width: 65%;
  margin: 0 auto;
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 0.5fr));
  grid-gap: 20px;
  box-sizing: border-box;
`;

export const SearchResultPage = () => {
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const searchBook = () => {
    if (!search) {
      return;
    }

    axios
      .get("https://www.googleapis.com/books/v1/volumes", {
        params: {
          q: search,
          key: "AIzaSyBZeJKPL9ccyGsvYo3_JA5OHw6ohKwGGgw", // 보안에 문제
          maxResults: 10, // 한 페이지당 10개의 결과를 가져오도록 설정
          startIndex: startIndex, // 페이지의 시작 인덱스 설정
        },
      })
      .then((res) => {
        if (res.data.items) {
          setBookData(res.data.items);
        } else {
          setBookData([]); // 응답에 항목이 없는 경우 처리
        }
      })
      .catch((err) => {
        console.log("오류:", err);
        setBookData([]); // 오류 처리: bookData를 빈 배열로 설정
      });
  };

  useEffect(() => {
    searchBook(); // 초기 검색 또는 startIndex 변경 시 검색 실행
  }, [startIndex]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setStartIndex(0); // 새로운 검색을 시작할 때 startIndex를 초기화
      searchBook();
    }
  };

  const nextPage = () => {
    setStartIndex(startIndex + 10); // 다음 페이지로 이동
  };

  const prevPage = () => {
    if (startIndex >= 10) {
      setStartIndex(startIndex - 10); // 이전 페이지로 이동
    }
  };

  return (
    <>
      <StyledTop></StyledTop>
      <StyledSearch
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search any book!"
        onClick={searchBook}
      ></StyledSearch>
      <Container>
        <SearchResultPageComp book={bookData} />
      </Container>
      <MiddleOrderBox>
        <StyledButton
          onClick={prevPage}
          value="이전"
          width="50px"
          height="50px"
        ></StyledButton>
        <div style={{ margin: "5px" }}></div>
        <StyledButton
          onClick={nextPage}
          value="다음"
          width="50px"
          height="50px"
        ></StyledButton>
      </MiddleOrderBox>
    </>
  );
};

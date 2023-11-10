import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { BookAxiosApi } from "../api/BookAxiosApi";

const AboutBookPage = () => {
  // useParams : 현재 url의 파라미터를 가져올 수 있다.
  const { id } = useParams(); // id파라미터를 객체 형태로 반환하며, 이를 구조 분해 할당을 통해서 id 변수로서 가져온다.
  const [book, setBook] = useState(null);

  useEffect(() => {
    const selectedBook = async () => {
      try {
        const response = await BookAxiosApi.findBookById(id);
        console.log(response.data);
        setBook(response.data); // API로부터 받은 책 정보를 상태에 저장합니다.
      } catch (error) {
        console.error("책 정보를 가져오는데 실패했습니다:", error);
      }
    };

    selectedBook();
  }, [id]);

  return (
    <div>
      <h1>상세페이지</h1>
      {book ? (
        <div>
          <p>제목: {book.title}</p>
          <p>작가: {book.author}</p>
          <p>출판사: {book.publisher}</p>
          <p>장르: {book.genre}</p>
          <p>이미지: {book.image_url}</p>
          <p>설명: {book.context_url}</p>
          <p>요약: {book.summary}</p>
          <p>가격: {book.price}</p>
          <p>출판일: {book.publish_year}</p>
        </div>
      ) : (
        <p>기다려 욘석아...</p> // 데이터를 불러오는 동안 표시할 내용
      )}
    </div>
  );
};

export default AboutBookPage;

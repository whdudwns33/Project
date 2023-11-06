import styled from "styled-components";
import { StyledButton } from "./StyledButton";

// 이미지
import { FaSearch, FaMicrophone } from "react-icons/fa";
import logo from "../assets/images/logo.png";

// 검색바
const SearchBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchLogo = styled.img`
  z-index: 15;
  width: 15vh;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const SearchMode = styled.div`
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

  &:hover {
    transform: scale(1.02);
  }
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  height: 100%;
  padding: 0 10px;
  font-size: 16px;
  border-radius: 24px;
`;

const SearchIcon = styled.div`
  margin-left: 3%;
  cursor: pointer;
  svg {
    color: yellowgreen;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.2);
      color: green;
    }
  }
`;

const MicIcon = styled.div`
  margin-right: 3%;
  cursor: pointer;
  svg {
    color: yellowgreen;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.2);
      color: green;
    }
  }
`;

export const StyledSearch = (props) => {
  const { value, onChange, onKeyDown, placeholder, onClick } = props;

  const handleSearchClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <SearchBox>
        <SearchLogo src={logo} alt="logo" />
        <SearchMode>
          <SearchIcon>
            <FaSearch size={15} />
          </SearchIcon>
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <MicIcon>
            <FaMicrophone size={15} />
          </MicIcon>
        </SearchMode>
        <StyledButton
          onClick={handleSearchClick}
          value="Search!"
          width="100px"
          height="50px"
        ></StyledButton>
      </SearchBox>
    </>
  );
};

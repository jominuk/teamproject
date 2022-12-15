import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StButton from "../../components/Buttons/StButton";

const Form = (props) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/add");
  };

  return (
    <StAddDiv>
      <StButton onClick={onClickHandler} {...props.button}>
        버킷리스트 추가하기
      </StButton>
    </StAddDiv>
  );
};

Form.defaultProps = {
  button: {
    border: "none",
    height: "70px",
    cursor: "pointer",
    borderRadius: "17px",
    backgroundColor: "teal",
    width: "400px",
    color: "#fff",
    fontWeight: 700,
  },
};
//폼의 종류별로 쓰고싶을떄 프롭스로 넘겨받았ㄷ을때

export default Form;

const StAddDiv = styled.div`
  background-color: #eee;
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  gap: 20px;
`;

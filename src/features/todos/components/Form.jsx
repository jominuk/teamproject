import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/add");
  };

  return (
    <StAddDiv>
      <StAddButton onClick={onClickHandler}>버킷리스트 추가하기</StAddButton>
    </StAddDiv>
  );
};

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

const StAddButton = styled.button`
  border: none;
  height: 70px;
  cursor: pointer;
  border-radius: 15px;
  background-color: teal;
  width: 340px;
  color: #fff;
  font-weight: 700;
`;

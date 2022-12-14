import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import StButton from "../components/Buttons/StButton";
import { __addTodos } from "../redux/modules/todosSlice";

const AddTodo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    title: "",
    body: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (input.title.trim() === "" || input.body.trim() === "") return;
    dispatch(
      __addTodos({
        id: `todos_${new Date().getTime() + Math.random()}`,
        title: input.title,
        body: input.body,
        isDone: false,
      })
    );
    setInput({
      title: "",
      body: "",
    });
    navigate("/");
  };

  return (
    <Addcontainer>
      <AddBox>
        <form onSubmit={onSubmitHandler}>
          <TitleInput
            type="text"
            name="title"
            value={input.title}
            onChange={onChangeHandler}
            placeholder="제목을 작성해주세요"
          />
          <BodoyInput
            type="text"
            name="body"
            value={input.body}
            onChange={onChangeHandler}
            placeholder="내용을 작성해주세요"
          />
          <BtnBox>
            <StButton
              width="13rem"
              height="40px"
              borderColor="blue"
              type="submit"
            >
              버킷 추가하기
            </StButton>
            <StButton
              width="13rem"
              height="40px"
              borderColor="red"
              onClick={() => {
                navigate("/");
              }}
            >
              돌아가기
            </StButton>
          </BtnBox>
        </form>
      </AddBox>
    </Addcontainer>
  );
};

const Addcontainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddBox = styled.div`
  width: 60%;
  height: 32rem;
  background-color: teal;
  border-radius: 8px;
  padding: 4.5rem 5rem 5rem 5rem;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 3rem;
  border-radius: 10px;
  border: 0px;
  font-size: 2rem;
  padding-left: 1rem;
`;

const BodoyInput = styled.textarea`
  width: 98%;
  height: 19rem;
  border-radius: 10px;
  border: 0px;
  padding: 1rem;
  margin-top: 3.5rem;
  font-size: 1.5rem;
  ::placeholder {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding: 0.5rem;
`;

export default AddTodo;

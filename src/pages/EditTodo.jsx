import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StButton from "../components/Buttons/StButton";
import { __editTodo } from "../redux/modules/todosSlice";

const EditTodo = () => {
  const [input, setInput] = useState({ title: "", body: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todo);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const editSubmit = () => {
    dispatch(
      __editTodo({
        id: todo.id,
        title: input.title,
        body: input.body,
      })
    );
  };

  return (
    <StlayoutBox>
      <Stbox>
        <div>
          <StboxHeader>
            <div>ID : {todo.id}</div>
            <StButton
              onClick={() => {
                navigate("/");
              }}
            >
              홈으로
            </StButton>

            <StButton onClick={editSubmit}>수정완료</StButton>
          </StboxHeader>

          <StTitle>
            <div> {todo.title} </div>
            <Stinput
              type="text"
              name="title"
              value={input.title}
              onChange={onChangeHandler}
            />
          </StTitle>

          <StContent>
            <div> {todo.body} </div>
            <Stinput
              type="text"
              name="body"
              value={input.body}
              onChange={onChangeHandler}
            />
          </StContent>

          <div></div>
        </div>
      </Stbox>
    </StlayoutBox>
  );
};

export default EditTodo;

const StlayoutBox = styled.div`
  width: 99.6%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Stbox = styled.div`
  border: 2px solid rgb(238, 238, 238);
  border-radius: 10px;
  padding: 12px 24px 24px 24px;
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  margin: 130px auto 0px auto;
`;

// const StButton = styled.button`
//   background-color: rgb(255, 255, 255);
//   border-radius: 12px;
//   width: 120px;
//   height: 40px;
//   border: 2px solid rgb(238, 238, 238);
//   cursor: pointer;
// `;

const StboxHeader = styled.div`
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
`;

const StTitle = styled.h2`
  padding: 0 24px;
`;

const StContent = styled.h2`
  padding: 0 24px;
`;

const Stinput = styled.input`
  border: 3px solid #0fa9e1;
  border-radius: 10px;
  width: 500px;
  height: 30px;
`;

import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTodoByID } from "../redux/modules/todosSlice.js";
// import { editTodo } from "../redux/modules/todosSlice";

const Detail = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todo);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTodoByID(id));
  }, [dispatch, id]);

  return (
    <StContainer>
      <StDialog>
        <div>
          <StDialogHeader>
            <div>ID :{todo.id}</div>
            {/* <Link to={`/EditTod/${todo.id}`}> */}

            <StButton borderColor="#ddd" onClick={() => navigate("/EditTodo")}>
              수정하기
            </StButton>
            {/* </Link> */}

            <StButton
              borderColor="#dddddd"
              onClick={() => {
                navigate("/");
              }}
            >
              이전으로
            </StButton>
          </StDialogHeader>
          <StTitle>{todo.title}</StTitle>
          <StBody>{todo.body}</StBody>
        </div>
      </StDialog>
    </StContainer>
  );
};

export default Detail;

const StContainer = styled.div`
  width: 99.6%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StDialog = styled.div`
  border: 2px solid rgb(238, 238, 238);
  border-radius: 10px;
  padding: 12px 24px 24px 24px;
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  margin: 130px auto 0px auto;
`;

const StDialogHeader = styled.div`
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
`;

const StTitle = styled.h1`
  padding: 0 24px;
`;

const StBody = styled.main`
  padding: 0 24px;
`;

const StButton = styled.button`
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  width: 120px;
  height: 40px;
  border: 2px solid rgb(238, 238, 238);
  cursor: pointer;
`;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  __getComments,
  __addComments,
} from "../redux/modules/commentsSlice.js";
import { getTodoByID } from "../redux/modules/todosSlice.js";
// import { editTodo } from "../redux/modules/todosSlice";
import StButton from "../components/Buttons/StButton.jsx";

const Detail = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todo);
  const { comments } = useSelector((state) => state.comments);
  console.log(comments);

  const [comment, setComment] = useState({ commentBody: "" });

  const { id } = useParams();
  const navigate = useNavigate();

  const onClickHandler = (e) => {
    if (!comment.commentBody) return;
    dispatch(
      __addComments({
        comment: comment.commentBody,
        postId: id,
        isDone: false,
      })
    );
    setComment("");
  };

  useEffect(() => {
    dispatch(getTodoByID(id));
    dispatch(__getComments());
  }, [dispatch, id]);

  return (
    <>
      <StContainer>
        <StDialog>
          <div>
            <StDialogHeader>
              <div>ID :{todo.id}</div>
              <StButtonGroup>
                <StButton
                  borderColor="black"
                  width="70px"
                  height="50px"
                  onClick={() => navigate("/EditTodo")}
                >
                  수정하기
                </StButton>
                <StButton
                  borderColor="teal"
                  width="70px"
                  height="50px"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  이전으로
                </StButton>
              </StButtonGroup>
            </StDialogHeader>
            <StTitle>{todo.title}</StTitle>
            <StBody>{todo.body}</StBody>
          </div>
        </StDialog>
      </StContainer>

      <StCommentInputGroup>
        <StCommentInput
          type="text"
          name="commentBody"
          value={comment.commentBody || ""}
          onChange={(e) => {
            const { value } = e.target;
            setComment({
              ...comment,
              commentBody: value,
            });
          }}
        />
        <StButton
          borderColor="teal"
          width="100px"
          height="40px"
          onClick={onClickHandler}
        >
          작성하기
        </StButton>
      </StCommentInputGroup>

      <StCommentContainer>
        {comments?.map((el) => {
          console.log(el);
          return (
            <StComment key={`comment_${el.id}`}>
              <div>2022-12-12</div>
              <div>{el.comment}</div>

              <StButtonGroup>
                <StButton borderColor="teal" width="50px" height="30px">
                  수정
                </StButton>
                <StButton borderColor="red" width="50px" height="30px">
                  삭제
                </StButton>
              </StButtonGroup>
            </StComment>
          );
        })}
      </StCommentContainer>
    </>
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
  border: 2px solid teal;
  border-radius: 10px;
  padding: 12px 24px 24px 24px;
  width: 70%;
  height: 300px;
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

const StButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StTitle = styled.h1`
  padding: 0 24px;
`;

const StBody = styled.main`
  padding: 0 24px;
`;

const StCommentInput = styled.input`
  height: 40px;
  width: 35%;
  border: 1px solid teal;
  border-radius: 12px;
  padding: 0 12px;
`;
const StCommentInputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
  gap: 30px;
`;

const StCommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StComment = styled.div`
  width: 70%;
  border: 2px solid teal;
  height: 20px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

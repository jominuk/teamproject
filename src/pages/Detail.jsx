import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  __getComments,
  __addComments,
  __deleteComments,
  __patchComment,
} from "../redux/modules/commentsSlice.js";
import { __getTodoByID } from "../redux/modules/todosSlice.js";
import StButton from "../components/Buttons/StButton.jsx";

const Detail = () => {
  //el.id랑 비교해서 일치하는것 구분해서 input창으로 바꾸기 ==> 수정 버튼 클릭시 edtiOn 에 아이디들어옴
  const [editOn, setEditOn] = useState("");
  // 수정완료시 input창에 작성한 값 받아오기
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { comments } = useSelector((state) => state.comments);
  const [comment, setComment] = useState({ commentBody: "" });

  const { id } = useParams();
  const todo = useSelector((state) => state.todos.todo);

  useEffect(() => {
    dispatch(__getTodoByID(id));
    dispatch(__getComments(id));
  }, []);

  //수정완료버튼
  const onEditComplete = (commentID) => {
    dispatch(__patchComment({ id: commentID, comment: input }));
    // 빈값으로 변경해줘야 일치하는 아이디 없이 input창으로 보여주는거 없애기
    setEditOn("");
  };

  const onDeleteComment = (id) => {
    dispatch(__deleteComments(id));
  };
  const onClickHandler = (e) => {
    if (!comment.commentBody) return;
    dispatch(
      __addComments({
        comment: comment.commentBody,
        id: `comments_${Math.floor(new Date().getTime() + Math.random())}`,
        postId: id,
        isDone: false,
      })
    );
    setComment("");
  };

  useEffect(() => {
    dispatch(__getTodoByID(id));
    dispatch(__getComments(id));
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
            <StTitle>{todo?.title}</StTitle>
            <StBody>{todo?.body}</StBody>
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
          maxLength="10"
          placeholder="10글자 입력 가능합니다."
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
          //editOn 아이디랑 비교해서 일치하는것 3항연산자 써서 인풋창으로 바꾸기
          return el.id === editOn ? (
            <StComment key={`comment_${el.id}`}>
              <StCalendar>{new Date().toLocaleDateString()}</StCalendar>
              <input onChange={(e) => setInput(e.target.value)} value={input} maxLength="10"/>

              <StButtonGroup>
                <StButton
                  onClick={() => onEditComplete(el.id)}
                  borderColor="teal"
                  width="50px"
                  height="30px"
                >
                  수정완료
                </StButton>
                <StButton
                  borderColor="red"
                  width="50px"
                  height="30px"
                  //에딧온 바꿔줘서 일치하는 아잉디없게 만들기
                  onClick={() => setEditOn("")}
                >
                  취소
                </StButton>
              </StButtonGroup>
            </StComment>
          ) : (
            <StComment key={`comment_${el.id}`}>
              <StCalendar>{new Date().toLocaleDateString()}</StCalendar>
              <div>{el.comment}</div>

              <StButtonGroup>
                <StButton
                  onClick={() => {
                    setEditOn(el.id);
                    setInput(el.comment);
                  }}
                  borderColor="teal"
                  width="50px"
                  height="30px"
                >
                  수정
                </StButton>
                <StButton
                  borderColor="red"
                  width="50px"
                  height="30px"
                  onClick={() => onDeleteComment(el.id)}
                >
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

const StComment = styled.div`
  width: 60%;
  border: 2px solid teal;
  height: 15px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StCalendar = styled.div`
  width: 20%;
`;
const StButtonGroup = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: end;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 15px;
`;

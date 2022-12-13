import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ListOfList from "./ListOfList.jsx";
import { __getTodos } from "../../redux/modules/todosSlice.js";

const List = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(__getTodos());
  }, []);

  return (
    <StListContainer>
      <h2>NOT DONE</h2>
      <StListWrapper>
        {todos.map((todo) => {
          if (todo.isDone === false) {
            return <ListOfList todo={todo} key={todo.id} borderColor="teal" backgroundColor="white" />;
          } else {
            return null;
          }
        })}
      </StListWrapper>
      <h2 className="list-title">DONE</h2>
      <StListWrapper>
        {todos.map((todo) => {
          if (todo.isDone === true) {
            return <ListOfList todo={todo} key={todo.id} borderColor="red" backgroundColor="#eee" />;
          } else {
            return null;
          }
        })}
      </StListWrapper>
    </StListContainer>
  );
};

export default List;

const StListContainer = styled.div`
  padding: 0 30px;
`;

const StListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

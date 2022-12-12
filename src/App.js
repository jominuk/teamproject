import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "./shared/Router";

const App = () => {
  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);
  console.log("난 승재");
  return <Router />;
};

export default App;

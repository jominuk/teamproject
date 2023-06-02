import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Header from "../components/ui/Header";
import Layout from "../components/ui/Layout";
import NotFound from "../pages/NotFound";
import AddTodo from "../pages/AddTodo";
import EditTodo from "../pages/EditTodo";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/EditTodo" element={<EditTodo />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;

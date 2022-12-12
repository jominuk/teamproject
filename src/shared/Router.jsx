import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Header from "../components/ui/Header";
import Layout from "../components/ui/Layout";
import NotFound from "../pages/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;

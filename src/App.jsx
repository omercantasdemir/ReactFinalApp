import "./App.css";
import React from "react";
import Home from "./components/Home";
import Root from "./components/Root";
import About from "./components/About";
import DetailView from "./components/DetailView";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Box>
        <Root />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/detailview/:code`} element={<DetailView />} />;
          <Route path="/about" element={<About />} />
          <Route path="*" element={<About />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;

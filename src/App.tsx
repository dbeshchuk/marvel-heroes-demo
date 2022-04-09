import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';

import HomePage from "./views/HomePage";
import HeroPage from "./views/HeroPage";

import './App.scss';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Container className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:heroId" element={<HeroPage />} />
        </Routes>
      </Container>
    </StyledEngineProvider>
  );
}

export default App;

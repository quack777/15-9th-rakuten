import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from "components/Container";
import DetailPage from "pages/DetailPage";
import LinkPage from "pages/LinkPage";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import { getItemData } from './api/getItemData';

function App() {

  useEffect(() => {
    async function getData() {
      const result = await getItemData();

      console.log(result);
    }

    getData();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<LinkPage />}/>
        <Route path="/detail/:id" element={<DetailPage />}/>
        </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;

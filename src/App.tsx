import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from "components/Container";
import DetailPage from "pages/DetailPage";
import LinkPage from "pages/LinkPage";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import { getItemData } from './api/getItemData';
import type { ItemType } from './api/getItemData';

function App() {
  const [itemInfoList, setItemInfoList] = useState<ItemType[]>([]);

  useEffect(() => {
    async function getData() {
      const result = await getItemData();

      setItemInfoList(result);
    }

    getData();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<LinkPage itemInfoList={itemInfoList}  />}/>
        <Route path="/detail" element={<DetailPage />}/> 
        <Route path="/detail?/*" element={<DetailPage />}/> 
        </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;

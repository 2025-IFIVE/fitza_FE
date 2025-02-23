import React from "react";
import * as M from "../styles/MainStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'

function Main() {
  return (
    <M.Background>
      <M.TopBox>
        <TopBar />
      </M.TopBox>

      <M.Container>
        <M.Header_>
              <M.Logo>FITZA</M.Logo>
              <M.Hr></M.Hr>
        </M.Header_>
      </M.Container>

      <M.BottomBox>
        <Footer />
      </M.BottomBox>
    </M.Background>
  );
}

export default Main;

import React, { useState } from "react";
import * as M from "../styles/MainStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'

function Main() {
  const [closetItems, setClosetItems] = useState([
    "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg"
    , "image7.jpg", "image8.jpg", "image9.jpg", "image10.jpg", "image11.jpg"
  ]);
  return (
    <M.Background>
      <M.TopBox>
        <TopBar />
      </M.TopBox>

      <M.Container>
        <M.Header>
              <M.Logo>FITZA</M.Logo>
        </M.Header>
        <M.TitleBox1>
          <M.Title1>최근 옷장</M.Title1>
        </M.TitleBox1>
        <M.ClosetScroll>
          {closetItems.map((item, index) => (
            <M.ClosetItem key={index}>
              <img src={item} alt={`최근옷${index}`} />
            </M.ClosetItem>
          ))}
        </M.ClosetScroll>
        <M.TitleBox2>
          <M.Title2>패션뉴스</M.Title2>
        </M.TitleBox2>
      </M.Container>

      <M.BottomBox>
      <Footer />
      </M.BottomBox>
    </M.Background>
  );
}

export default Main;

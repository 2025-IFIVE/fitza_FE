import React, { useState } from "react";
import * as M from "../styles/MainStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'

//더미데이터
import img1 from '../img/img4.png';
import img2 from '../img/img2.png';
import img3 from '../img/img3.png';
import img4 from '../img/img4.png';
import img5 from '../img/img5.png';
import img6 from '../img/img6.png';
import img7 from '../img/img7.png';
import img8 from '../img/img8.png';
import img9 from '../img/img9.png';

import news1 from '../img/news1.png';
import news2 from '../img/news2.png';
import news3 from '../img/news3.png';

function Main() {
  const [closetItems, setClosetItems] = useState([
    img1, img2, img3, img4, img5, img6
    , img7, img8, img9
  ]);

  const newsItems = [
    { id: 1, image: news1, title: "올여름, 당신이 입지 않을 것들", description: "다가오는 패션 트렌드를 확인해보세요." },
    { id: 2, image: news2, title: "2025년 봄/여름 미디 드레스와 가장 잘 어울리는 스니커즈 조합!", description: "편안하면서도 스타일을 살릴 수 있는 스니커즈 매치" },
    { id: 3, image: news3, title: "올 봄, 새 옷 구매보다 효과적인 스타일링 팁", description: "옷장 속 아이템만으로 새로운 룩을 연출하세요." },
  ];


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
        <M.NewsContainer>
          {newsItems.map((news) => (
            <M.NewsItem key={news.id}>
              <M.NewsImage src={news.image} alt={news.title} />
              <M.NewsContent>
                <M.NewsTitle>{news.title}</M.NewsTitle>
                <M.NewsDescription>{news.description}</M.NewsDescription>
              </M.NewsContent>
            </M.NewsItem>
          ))}
        </M.NewsContainer>
      </M.Container>

      <M.BottomBox>
        <Footer />
      </M.BottomBox>
    </M.Background>
  );
}

export default Main;

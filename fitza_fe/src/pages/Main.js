import React, { useState } from "react";
import * as M from "../styles/MainStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'

function Main() {
  const [closetItems, setClosetItems] = useState([
    "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg"
    , "image7.jpg", "image8.jpg", "image9.jpg", "image10.jpg", "image11.jpg"
  ]);

  const newsItems = [
    { id: 1, image: "news1.jpg", title: "패션 트렌드 2025", description: "다가오는 패션 트렌드를 확인해보세요." },
    { id: 2, image: "news2.jpg", title: "여름 스타일링 팁", description: "시원한 여름을 위한 스타일링 팁!" },
    { id: 3, image: "news3.jpg", title: "지속 가능한 패션", description: "친환경 패션 아이템을 만나보세요." },
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

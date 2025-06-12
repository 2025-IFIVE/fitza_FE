import React, { useEffect, useState } from "react";
import * as M from "../styles/MainStyle";
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import axios from "axios";

import news1 from '../img/news1.png';
import news2 from '../img/news2.png';
import news3 from '../img/news3.png';

function Main() {
  const [closetItems, setClosetItems] = useState([]);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${process.env.REACT_APP_API}/api/clothing/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 1. 이미지 경로 생성
        let items = response.data.map(item => ({
          src: `${process.env.REACT_APP_API}${item.croppedPath}`,
          id: item.clothid
        }));

        // 2. 랜덤 순서로 섞고 앞에서 6개만 선택
        items = items.sort(() => Math.random() - 0.5).slice(0, 6);

        setClosetItems(items);
      } catch (error) {
        console.error("옷장 데이터 불러오기 실패:", error);
      }
    };

    fetchClothes();
  }, []);

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
          <M.Title1>MY CLOSET</M.Title1>
        </M.TitleBox1>

        <M.ClosetScroll>
          {closetItems.map((item, index) => (
            <M.ClosetItem key={index}>
              <img src={item.src} alt={`최근옷${index}`} />
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

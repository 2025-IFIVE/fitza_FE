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
    { id: 1, 
      image: news1, 
      title: "클린 걸은 나가주세요, 엉망진창 ‘메시 걸’이 옵니다", 
      description: "혼란스러움을 사과하지 않는 멋진 여자! 프랑스 <보그> 친구들이 메시 걸을 이렇게 소개하더군요. 2025년, ‘인디 슬리즈’가 고유의 미학을 넘어 새로운 국면으로 돌아왔습니다.",
      link: "https://www.vogue.co.kr/2025/06/12/%ed%81%b4%eb%a6%b0-%ea%b1%b8%ec%9d%80-%eb%82%98%ea%b0%80%ec%a3%bc%ec%84%b8%ec%9a%94-%ec%97%89%eb%a7%9d%ec%a7%84%ec%b0%bd-%eb%a9%94%ec%8b%9c-%ea%b1%b8%ec%9d%b4-%ec%98%b5%eb%8b%88%eb%8b%a4/"
    },
    { id: 2, 
      image: news2, 
      title: "방금 코펜하겐에서 돌아왔는데 모두 이 청바지를 입고 출근하더군요", 
      description: "입소문 난 카페와 바, 오감을 자극하는 편집숍, 이민을 꿈꾸게 하는 근사한 숙소, 그리고 내일 따위 걱정하지 않을 듯한 패션 피플들!",
      link: "https://www.vogue.co.kr/2025/06/12/%eb%b0%a9%ea%b8%88-%ec%bd%94%ed%8e%9c%ed%95%98%ea%b2%90%ec%97%90%ec%84%9c-%eb%8f%8c%ec%95%84%ec%99%94%eb%8a%94%eb%8d%b0-%eb%aa%a8%eb%91%90-%ec%9d%b4-%ec%b2%ad%eb%b0%94%ec%a7%80%eb%a5%bc-%ec%9e%85/"
    },
    { id: 3, 
      image: news3, 
      title: "버즈 커트 스타일로 시간을 되돌린 브래드 피트", 
      description: "벤자민 버튼의 시간은 거꾸로 갑니다. 브래드 피트의 시간도 마찬가지일까요? 그가 헤어스타일 변신을 통해 2004년으로 돌아갔습니다.",
      link: "https://www.vogue.co.kr/2025/06/12/%eb%b2%84%ec%a6%88-%ec%bb%a4%ed%8a%b8-%ec%8a%a4%ed%83%80%ec%9d%bc%eb%a1%9c-%ec%8b%9c%ea%b0%84%ec%9d%84-%eb%90%98%eb%8f%8c%eb%a6%b0-%eb%b8%8c%eb%9e%98%eb%93%9c-%ed%94%bc%ed%8a%b8/"
    },
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
          <M.Title2>Fashion Trend</M.Title2>
        </M.TitleBox2>

        <M.NewsContainer>
          {newsItems.map((news) => (
            <a
              key={news.id}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
            <M.NewsItem key={news.id}>
              <M.NewsImage src={news.image} alt={news.title} />
              <M.NewsContent>
                <M.NewsTitle>{news.title}</M.NewsTitle>
                <M.NewsDescription>{news.description}</M.NewsDescription>
              </M.NewsContent>
            </M.NewsItem>
            </a>
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
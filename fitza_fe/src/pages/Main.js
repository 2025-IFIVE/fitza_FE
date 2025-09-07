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
      title: "지금 같은 환절기에 활용하기 딱 좋은 스타일링 아이디어 4", 
      description: "오늘 아침 출근길은 유독 기분이 좋았습니다. 몇 달간 느껴보지 못한 선선한 공기를 느꼈기 때문이죠. 이는 가을이 서서히 우리에게 다가오고 있다는 가장 확실한 신호입니다",
      link: "https://www.vogue.co.kr/2025/09/02/%ec%a7%80%ea%b8%88-%ea%b0%99%ec%9d%80-%ed%99%98%ec%a0%88%ea%b8%b0%ec%97%90-%ed%99%9c%ec%9a%a9%ed%95%98%ea%b8%b0-%eb%94%b1-%ec%a2%8b%ec%9d%80-%ec%8a%a4%ed%83%80%ec%9d%bc%eb%a7%81-%ec%95%84%ec%9d%b4/"
    },
    { id: 2, 
      image: news2, 
      title: "가을을 불러오는 가장 빠른 방법, 브라운에 ‘이 컬러’ 더하기!", 
      description: "마음은 이미 가을로 앞서갔건만 햇볕은 아직 여름입니다. 어서 가을 스타일링을 시작하고 싶다면 컬러부터 바꿔보세요. 그중에서도 가을 제철 듀오, 브라운과 레드로요!",
      link: "https://www.vogue.co.kr/2025/09/02/%ea%b0%80%ec%9d%84%ec%9d%84-%eb%b6%88%eb%9f%ac%ec%98%a4%eb%8a%94-%ea%b0%80%ec%9e%a5-%eb%b9%a0%eb%a5%b8-%eb%b0%a9%eb%b2%95-%eb%b8%8c%eb%9d%bc%ec%9a%b4%ec%97%90-%ec%9d%b4-%ec%bb%ac%eb%9f%ac/"
    },
    { id: 3, 
      image: news3, 
      title: "올가을엔 말랑하게 걸어보세요!", 
      description: "패션 피플이라고 발뒤꿈치가 벗겨지지 않는 건 아닐 겁니다. 제 사이즈에 맞게 신어도, 양말을 갖춰 신어도 신발이 딱딱하면 걸으면서 벗겨지기 일쑤예요.",
      link: "https://www.vogue.co.kr/2025/09/02/%ec%98%ac%ea%b0%80%ec%9d%84%ec%97%94-%eb%a7%90%eb%9e%91%ed%95%98%ea%b2%8c-%ea%b1%b8%ec%96%b4%eb%b3%b4%ec%84%b8%ec%9a%94/"
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
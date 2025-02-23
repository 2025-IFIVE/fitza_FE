import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as M from "../styles/MyClosetStyle_1";
import TopBar from '../components/TopBar'
import Footer from '../components/Footer'

const MyCloset_1 = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다. 기본값(서울)으로 설정합니다.", error);
          fetchWeather(37.5665, 126.9780); // 서울 기본 위치
        }
      );
    } else {
      console.error("Geolocation이 지원되지 않습니다. 기본값(서울)으로 설정합니다.");
      fetchWeather(37.5665, 126.9780); // 서울 기본 위치
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    const API_KEY = "YOUR_API_KEY"; // 기상청 API 키
    const nx = Math.floor(lat); // 위도에 해당하는 좌표 값 (예: 서울은 60)
    const ny = Math.floor(lon); // 경도에 해당하는 좌표 값 (예: 서울은 127)
    const base_date = new Date().toISOString().split('T')[0].replace(/-/g, ''); // 오늘 날짜
    const base_time = '0600'; // 기상청 API에서 요구하는 시간 (예: 0600)

    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/forecast?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;

    try {
      const response = await axios.get(url);
      if (response.data.response.body.items) {
        setWeather(response.data.response.body.items[0]);
      }
    } catch (error) {
      console.error("날씨 정보를 가져오는데 실패했습니다.", error);
    }
  };

  const categories = ["상의", "하의", "아우터", "원피스", "신발", "가방", "패션소품"];

  return (
    <M.Background>
      <TopBar />
      <M.Container>
        <M.Header_>
            <M.Container2>
                <M.Logo>FITZA</M.Logo>
                <M.Title>내 옷장</M.Title>
            </M.Container2>
            
            <M.Hr></M.Hr>
        </M.Header_>

        {/* 날씨 정보 */}
        <M.WeatherSection>
          {weather ? (
            <>
              <div>
                <p>오늘의 날씨</p>
                <strong>{weather.temp}°C</strong> {/* 기상청 API에서 응답 받은 날씨 데이터 */}
                <p>{weather.weather}</p>
              </div>
            </>
          ) : (
            <p>날씨 정보를 불러오는 중...</p>
          )}
        </M.WeatherSection>

        {/* 카테고리 */}
        <M.CategorySection>
          <h3>category</h3>
          {categories.map((category, index) => (
            <M.CategoryItem key={index} onClick={() => navigate(`/category/${category}`)}>
              {category}
            </M.CategoryItem>
          ))}
        </M.CategorySection>

        {/* 최근 코디 */}
        <M.RecentCoordiSection>
          <h3>최근 코디</h3>
          <div>
            {[1, 2, 7].map((day) => (
              <M.CoordiCard key={day}>
                <img src="/sample-coordi.png" alt={`코디 ${day}일 전`} />
                <p>{day}일 전</p>
              </M.CoordiCard>
            ))}
          </div>
        </M.RecentCoordiSection>
      </M.Container>

      <Footer />
    </M.Background>
  );
};

export default MyCloset_1;

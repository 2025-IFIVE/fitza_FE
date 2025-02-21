import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as M from "../styles/MyClosetStyle_1";

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
      fetchWeather(37.5665, 126.9780);
    }
  }, []);
  
  const fetchWeather = async (lat, lon) => {
    const API_KEY = "4edb7b32837f2109fc0331b22deb698c"; // API 키
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${API_KEY}`;
  
    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("날씨 정보를 가져오는데 실패했습니다.", error);
    }
  };
  

  const categories = ["상의", "하의", "아우터", "원피스", "신발", "가방", "패션소품"];

  return (
    <M.Container>
        <M.Header_>
            <M.Logo>FITZA</M.Logo>
            <M.Title>내 옷장</M.Title>
        </M.Header_>
      {/* 날씨 정보 */}
      <M.WeatherSection>
        {weather ? (
          <>
            <div>
              <p>오늘의 날씨</p>
              <strong>{weather.main.temp}°C</strong>
              <p>{weather.weather[0].description}</p>
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
  );
};

export default MyCloset_1;

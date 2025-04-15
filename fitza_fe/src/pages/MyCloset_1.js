import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as M from "../styles/MyClosetStyle_1";
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

import sampleCoordi1 from "../img/sample-coordi-1.png";
import sampleCoordi2 from "../img/sample-coordi-2.png";
import sampleCoordi3 from "../img/sample-coordi-3.png";
import dailycodiExImg from "../img/dailycodi_ex-img.png";

const MyCloset_1 = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [dateInfo, setDateInfo] = useState({ day: "", date: "" });

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

    // 날짜 및 요일 설정
    const today = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    setDateInfo({
      day: days[today.getDay()],
      date: `${today.getMonth() + 1}.${today.getDate()}`
    });

  }, []);

  // 🔹 날씨 설명과 아이콘을 매핑하는 함수
  const getWeatherIcon = (description, dt) => {
    console.log("받아온 날씨 설명:", description); // 받아온 값 확인
    
    let matchedCode = null;
  
    if (description.includes("맑음")) matchedCode = "clear";
    else if (description.includes("구름") || description.includes("흐림")) matchedCode = "cloudy";
    else if (description.includes("비") || description.includes("소나기")) matchedCode = "rain";
    else if (description.includes("눈")) matchedCode = "snow";
    else if (description.includes("안개")) matchedCode = "fog";
  
    // 디폴트 값 설정
    matchedCode = matchedCode || "clear";
  
    const isDaytime = (new Date(dt * 1000).getHours() >= 6 && new Date(dt * 1000).getHours() < 18);
    const iconSuffix = isDaytime ? "day" : "night";
  
    try {
      return require(`../img/MyCloset_1-${matchedCode}-${iconSuffix}.png`);
    } catch (error) {
      console.error("이미지 불러오기 실패:", error);
      return null;
    }
  };

  const fetchWeather = async (lat, lon) => {
    const API_KEY = "4edb7b32837f2109fc0331b22deb698c"; // OpenWeatherMap API Key
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      const weatherDesc = data.list[0].weather[0].description; // 첫 번째 예보 데이터의 날씨 설명
      const weatherIcon = getWeatherIcon(weatherDesc, data.list[0].dt); // 로컬 아이콘 URL 가져오기

      // 하루의 최고/최저 온도를 forecast에서 추출
      const dailyTemps = data.list.reduce(
        (acc, curr) => {
          const temp = curr.main.temp;
          acc.max = Math.max(acc.max, temp);
          acc.min = Math.min(acc.min, temp);
          return acc;
        },
        { max: -Infinity, min: Infinity }
      );

      setWeather({
        temp: Math.round(data.list[0].main.temp), // 현재 온도 (첫 번째 예보 시간 기준)
        temp_max: Math.round(dailyTemps.max), // 최고 온도 (예보 데이터에서 추출)
        temp_min: Math.round(dailyTemps.min), // 최저 온도 (예보 데이터에서 추출)
        description: weatherDesc, // 날씨 설명
        icon: weatherIcon, // 로컬 아이콘
        rain: data.list[0].rain ? (data.list[0].rain["1h"] || data.list[0].rain["3h"]) : 0 // 첫 번째 예보 데이터에서 강수량
      });

    } catch (error) {
      console.error("날씨 정보를 가져오는데 실패했습니다.", error);
    }
  };

  const categories = ["상의", "하의", "아우터", "원피스", "신발", "모자", "기타"];

  const imageMap = {
    1: sampleCoordi1,
    2: sampleCoordi2,
    3: sampleCoordi3,
  };
  
  return (
    <M.Background>
      <TopBar />
      <M.Container>
        <M.Header_>
          <M.Container2>
            <M.Logo>FITZA</M.Logo>
            <M.Title>내 옷장</M.Title>
          </M.Container2>
          <M.Hr />
        </M.Header_>

        <M.WeatherandDailyCodi>
        {/* 날씨 정보 */}
        <M.WeatherContainer>
          <M.WeatherSection1>
            {weather ? (
              <>
                <div>
                  <M.WeatherTitle>오늘의 날씨</M.WeatherTitle>
                  <M.WeatherTemp>
                    현재 온도&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <M.TempValue>{weather.temp} °</M.TempValue>
                  </M.WeatherTemp>
                </div>
                <M.WeatherSection2>
                  <M.WeatherDesc>{dateInfo.date}&nbsp;&nbsp;&nbsp;{dateInfo.day}</M.WeatherDesc>
                  <M.WeatherDesc> {weather.description}&nbsp;&nbsp;&nbsp;
                    <M.WeatherIcon src={weather.icon} alt="날씨 아이콘" />
                  </M.WeatherDesc>
                  <M.WeatherDetails>최고: &nbsp;{weather.temp_max}° / 최저: &nbsp;{weather.temp_min}°</M.WeatherDetails>
                  <M.WeatherDetails>강수량: {weather.rain}mm</M.WeatherDetails>
                </M.WeatherSection2>
              </>
            ) : (
              <p>날씨 정보를 불러오는 중...</p>
            )}
          </M.WeatherSection1>
        </M.WeatherContainer>

        {/* 데일리 코디 추천*/}
        <M.DailyCodiSection>
          <M.DailyCodiTitle>데일리 코디 추천</M.DailyCodiTitle>
          <M.DailyCodiLook>
          <img src={dailycodiExImg} alt="데일리 코디 예시 이미지" />
          </M.DailyCodiLook>

        </M.DailyCodiSection>
        </M.WeatherandDailyCodi>

        {/* 카테고리 */}
        <M.CategorySection>
          <M.CategoryTitle>category</M.CategoryTitle>
          {categories.map((category, index) => (
            <M.CategoryItem key={index} onClick={() => navigate(`/category/${category}`)}>
              {category}
            </M.CategoryItem>
          ))}
        </M.CategorySection>

        {/* 최근 코디 */}
        <M.RecentCoordiSection>
          <M.CoordiTitle>최근 코디</M.CoordiTitle>
          <M.CoordiCardWrapper>
            {[1, 2, 3].map((day) => (
              <M.CoordiCardWrapperItem key={day}>
                <M.CoordiCard onClick={() => navigate(`/calendar/${day}`)}>
                <img src={imageMap[day]} alt={`코디 ${day}일 전`} />
                </M.CoordiCard>
                <p>{day}일 전</p>
                <p> (20xx.xx.xx)</p>
              </M.CoordiCardWrapperItem>
            ))}
          </M.CoordiCardWrapper>
        </M.RecentCoordiSection>


      </M.Container>
      <Footer />
    </M.Background>
  );
};

export default MyCloset_1;

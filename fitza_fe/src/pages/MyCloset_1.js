import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as M from "../styles/MyClosetStyle_1";
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import refreshIcon from "../img/refresh.png";
import { normalizeAbsoluteUrl } from "../utils/url.ts";


const MyCloset_1 = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [dateInfo, setDateInfo] = useState({ day: "", date: "" });
  const [recentCoordi, setRecentCoordi] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    // ✅ 위도/경도 기반 날씨는 이미 잘 호출되고 있음
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const temps = await fetchWeather(latitude, longitude);
          fetchRecommendation(temps.min, temps.max);  // ✅ 처음 한 번만 실행
        },
        (error) => {
          console.error("위치 정보 실패, 서울로 대체", error);
          fetchWeather(37.5665, 126.9780).then((temps) =>
            fetchRecommendation(temps.min, temps.max)
          );
        }
      );
    } else {
      fetchWeather(37.5665, 126.9780).then((temps) =>
        fetchRecommendation(temps.min, temps.max)
      );
    }
    const today = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    setDateInfo({
      day: days[today.getDay()],
      date: `${today.getMonth() + 1}.${today.getDate()}`
    });
  
    // ✅ 이 한 줄 추가!
    fetchRecentCoordi();
  
  }, []);  // ← 의존성 배열은 그대로
  
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

  // 날씨만 불러옴
const fetchWeather = async (lat, lon) => {
  const API_KEY = "4edb7b32837f2109fc0331b22deb698c";
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    const weatherDesc = data.list[0].weather[0].description;
    const weatherIcon = getWeatherIcon(weatherDesc, data.list[0].dt);

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
      temp: Math.round(data.list[0].main.temp),
      temp_max: Math.round(dailyTemps.max),
      temp_min: Math.round(dailyTemps.min),
      description: weatherDesc,
      icon: weatherIcon,
      rain: data.list[0].rain ? (data.list[0].rain["1h"] || data.list[0].rain["3h"]) : 0
    });

    return { min: dailyTemps.min, max: dailyTemps.max }; // ✅ 추가

  } catch (error) {
    console.error("날씨 정보 가져오기 실패:", error);
  }
};

const getUserIdFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    // JWT payload 디코딩
    const payload = JSON.parse(atob(token.split(".")[1]));
    
    return payload.userId ?? payload.id ?? payload.sub ?? null;
  } catch (e) {
    console.error("JWT 파싱 실패:", e);
    return null;
  }
};

const fetchRecommendation = async (min, max) => {
  const getWeatherRangeKey = (min, max) => {
    const avg = (min + max) / 2;
    if (avg >= 28) return "28도 이상";
    if (avg >= 23) return "23~27도";
    if (avg >= 17) return "17~22도";
    if (avg >= 12) return "12~16도";
    return "11도 이하";
  };

  const rangeStr = getWeatherRangeKey(min, max);
  const token = localStorage.getItem("authToken");
  const userId = getUserIdFromToken(); 

  try {
    const recRes = await axios.post(`${process.env.REACT_APP_API}/recommend`, {
      userId: userId,
      weather: rangeStr
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setRecommendation(recRes.data.data.recommendation);
  } catch (error) {
    console.error("[/recommend] axios error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,   
      headers: error.response?.headers,
      url: error.config?.url,
      method: error.config?.method,
      sentBody: { userId, weather: rangeStr },
    });
    console.error("추천 정보를 가져오는데 실패했습니다:", error);
  }
};

  const fetchRecentCoordi = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const listRes = await axios.get(`${process.env.REACT_APP_API}/api/coordination/my`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const list = listRes.data;
    //list.sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log("🧪 응답 받은 코디 목록", list);

    // 🔽 날짜 중복 제거: 같은 날짜의 코디는 하나만 유지
    const uniqueByDate = {};
    list.forEach(item => {
      const date = item.date;
    
      if (!uniqueByDate[date]) {
        uniqueByDate[date] = item;
      } else {
        // ✅ calendarId가 더 큰 (= 최신) 걸 남긴다
        if (item.calendarId > uniqueByDate[date].calendarId) {
          uniqueByDate[date] = item;
        }
      }
    });
    
    const uniqueList = Object.values(uniqueByDate).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const top3 = await Promise.all(uniqueList.slice(0, 3).map(async (coordi) => {
      const detailRes = await axios.get(`${process.env.REACT_APP_API}/api/coordination/${coordi.calendarId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    
      const items = detailRes.data.items;
      if (!items || items.length === 0) return null;
    
      // detail.items 안에서 직접 이미지 경로 추출
      const imageList = items.map(item => ({
        clothId: item.clothId,
        x: item.x,
        y: item.y,
        size: item.size,
        path: item.croppedPath || item.imagePath  // 👈 여기를 clothing 호출 없이 사용
      })).filter(item => item.path);
    
      const dateObj = new Date(coordi.date + "T00:00:00");
      const today = new Date();
      const dayDiff = Math.floor((today - dateObj) / (1000 * 60 * 60 * 24));
    
      return {
        id: coordi.calendarId,
        date: coordi.date,
        dayDiff,
        images: imageList
      };
    }));

    setRecentCoordi(top3.filter(Boolean)); // null 제거
  } catch (err) {
    console.error("최근 코디 불러오기 실패", err);
  }
};

  const categories = ["상의", "하의", "아우터", "원피스", "모자", "기타"];

  
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
        <M.DailyCodiSection style={{ position: "relative", overflow: "hidden", padding: "10px" }}>
  <M.DailyCodiTitle style={{ marginBottom: "5px" }}>데일리 코디 추천</M.DailyCodiTitle>

  <button
    onClick={() => weather && fetchRecommendation(weather.temp_min, weather.temp_max)}
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "4px"
    }}
  >
    <img
      src={refreshIcon}
      alt="새로고침"
      style={{ width: "18px", height: "18px" }}
      title="새로 추천받기"
    />
  </button>

  <M.DailyCodiLook>
  {recommendation?.items?.length > 0 ? (
    recommendation.items.map((item, idx) => (
      <img
        key={idx}
        src={normalizeAbsoluteUrl(item.imageUrl, process.env.REACT_APP_API)}
        alt=""
        style={{
          width: "80px",
          height: "100px",
          objectFit: "contain"
        }}
      />
    ))
  ) : recommendation === null ? (
    // 🔹 recommendation이 아직 없는 첫 방문 상태 → 아무 것도 표시하지 않음
    null
  ) : (
    // 🔹 recommendation은 있지만 items가 비어 있을 때
    <p style={{ fontSize: "0.85rem", color: "#666" }}>추천 코디가 없습니다.</p>
  )}
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
            {recentCoordi.map((item) => (
              <M.CoordiCardWrapperItem key={item.id}>
                <M.CoordiCard onClick={() => navigate("/calendardetail", {
                  state: {
                    calendarId: item.id,
                    selectedDate: item.date
                  }
                })}>
                {item.images.map((img, idx) => (
                  <img
                  key={idx}
                  src={normalizeAbsoluteUrl(img.path, process.env.REACT_APP_API)}
                  alt={`코디 아이템 ${idx}`}
                  style={{
                    position: "absolute",
                    top: `${img.y ?? 50}%`,
                    left: `${img.x ?? 50}%`,
                    width: `${img.size ?? 100}%`,
                    transform: "translate(0%, 0%)", // ✅ 중심 살짝 아래로
                    objectFit: "contain",
                    pointerEvents: "none"
                  }}
                />
                
                ))}
              </M.CoordiCard>

                <p>{item.dayDiff}일 전</p>
                <p>({item.date})</p>
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

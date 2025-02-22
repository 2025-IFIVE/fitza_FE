import React, { useState } from "react";
import * as C from "../styles/CalendarStyle";
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { Link, useNavigate } from "react-router-dom";
import smallPlus from '../img/smallPlus.png';

function Calendar() {
  return (
    <C.Background>
      <C.TopBox>
        <TopBar />
      </C.TopBox>

      <C.Container>
        <C.Header>
              <C.Logo>FITZA</C.Logo>
        </C.Header>
        <C.TitleBox1>
          <C.Title1>2025.02.16</C.Title1>
          <C.RegisterContainer>
            <C.Register>옷 기록하기</C.Register>
            <Link to="/Main">
                <img src={smallPlus} alt="plus" className="plusImage" />
            </Link>
          </C.RegisterContainer>
        </C.TitleBox1>
      </C.Container>

      <C.BottomBox>
      <Footer />
      </C.BottomBox>
    </C.Background>
  );
}

export default Calendar;
